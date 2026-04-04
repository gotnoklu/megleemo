import { describe, expect, it } from "vitest";
import app from "../../src/index";

describe("Base Routes", () => {
	it("Should return 200 Response", async () => {
		const req = new Request("http://localhost/");
		const res = await app.fetch(req);
		expect(res.status).toBe(200);
	});
});
