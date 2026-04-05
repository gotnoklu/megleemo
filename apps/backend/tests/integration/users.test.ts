import { describe, expect, it } from "vitest";
import app from "../../src/index";

const BASE_URL = "http://localhost:3000/users";

describe("Users Route Tests: `/users`", () => {
	it("Returns 404 for the root `/` endpoint", async () => {
		const req = new Request(BASE_URL);
		const res = await app.fetch(req);

		expect(res.status).toBe(404);
	});

	it("Returns 400 when no data is sent to the root `/` endpoint", async () => {
		const req = new Request(BASE_URL, {
			method: "post",
		});

		const res = await app.fetch(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json).toHaveProperty("data");
		expect(json).property("data").instanceof(Array);
	});

	it("Returns 400 when invalid data is sent to the root `/` endpoint", async () => {
		const req = new Request(BASE_URL, {
			method: "post",
			body: JSON.stringify({ a: 1 }),
		});

		const res = await app.fetch(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json).toHaveProperty("data");
		expect(json).property("data").instanceof(Array);
	});

	it("Returns 201 when valid data is sent to the root `/` endpoint", async () => {
		const req = new Request(BASE_URL, {
			method: "post",
			body: JSON.stringify({ first_name: "John" }),
		});

		const res = await app.fetch(req);

		expect(res.status).toBe(201);
		await expect(res.json()).resolves.toEqual({
			message: "OK",
		});
	});
});
