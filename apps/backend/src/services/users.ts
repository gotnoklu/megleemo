import type { CreateOneUserType } from "../dtos/users";
import { Ok, type Result } from "../libraries/result";
import type { ServiceHandler } from "../types/global";

export const $createOneUser: ServiceHandler<
	CreateOneUserType,
	Result<boolean, unknown>
> = (payload) => {
	return Ok(true);
};
