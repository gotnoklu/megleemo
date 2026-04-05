import type { Context, Next } from "hono";
import {
	type AnySchema,
	type BaseIssue,
	type BaseSchema,
	type InferInput,
	type InferOutput,
	safeParseAsync,
} from "valibot";
import { sendResponse } from "../utilities/api";
import { isObject, safe } from "../utilities/global";

/**
 * Validates a request payload.
 *
 * @param validator - The schema to validate the request object against.
 * @param [options] - Optional options for specifying the location of the request object.
 * @returns - A middleware function that validates the request object.
 */
export function validateRequest(
	validator: BaseSchema<
		InferInput<AnySchema>,
		InferOutput<AnySchema>,
		BaseIssue<unknown>
	>,
	options: {
		field:
			| Extract<keyof Context["req"], "header" | "param" | "query">
			| "multipart"
			| "www-urlencoded"
			| "json"
			| "text";
	},
) {
	return async (c: Context, next: Next) => {
		let payload: any;

		if (options.field === "multipart" || options.field === "www-urlencoded") {
			payload = await c.req.parseBody();
		} else if (options.field === "json") {
			/**
			 * If parsing the body into JSON fails, I don't want it to throw an error, so I safely run it to return a
			 * `Result<Ok, Err>` type. If the result is an error (ie: the JSON parsing fails), I set the payload value
			 * to a noop function to intentionally fail the validation, since a function is invalid JSON.
			 *
			 * I could've chosed `undefined`, but that could pass for validators that support missing/optional values.
			 * Realistically, a function is one of the best fits in this case.
			 */
			const result = await safe(c.req.json());
			if (result.isOk()) {
				payload = result.data;
			} else {
				payload = () => {};
			}
		} else if (options.field === "text") {
			payload = await c.req.text();
		} else if (options.field === "header") {
			payload = c.req.header();
		} else if (options.field === "param") {
			payload = c.req.param();
		} else if (options.field === "query") {
			payload = c.req.query();
		}

		const validation = await safeParseAsync(validator, payload);

		if (validation.success) {
			const passedRequestValues = c.get("payload");

			if (passedRequestValues === undefined || isObject(passedRequestValues)) {
				c.set(
					"payload",
					Object.assign({}, passedRequestValues, validation.output),
				);
			} else {
				c.set("payload", validation.output);
			}

			return next();
		}

		return sendResponse(c, {
			status: 400,
			message:
				"The request is invalid. Please check the `data` field for details.",
			data: validation.issues.map((issue) => ({
				...issue,
				path: issue.path?.map((path) => path.key).join("."),
			})),
		});
	};
}
