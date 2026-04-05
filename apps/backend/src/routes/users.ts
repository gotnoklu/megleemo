import { Context, Env, Hono, Input, Next } from "hono";
import { handleCreateOneUser } from "../controllers/users";
import { CreateOneUser } from "../dtos/users";
import { validateRequest } from "../middlewares/validators";

const UsersRoute = new Hono();

UsersRoute.post(
	"/",
	validateRequest(CreateOneUser, { field: "json" }),
	handleCreateOneUser,
);

export { UsersRoute };
