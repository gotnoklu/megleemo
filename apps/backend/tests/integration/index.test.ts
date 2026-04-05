import { describe, expect, it } from "vitest";
import app from "../../src/index";

describe("Base Route Tests", () => {
	it("Returns 404 for the root `/` endpoint", async () => {
		const req = new Request("http://localhost:3000/");
		const res = await app.fetch(req);

		expect(res.status).toBe(404);
	});

	it("Returns 200 for the `/status` endpoint", async () => {
		const req = new Request("http://localhost:3000/status");
		const res = await app.fetch(req);

		expect(res.status).toBe(200);
		await expect(res.json()).resolves.toEqual({
			message: "All systems healthy.",
		});
	});
});
