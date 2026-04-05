import type { CreateOneUserType } from "../dtos/users"
import { $createOneUser } from "../services/users"
import type { ApiHandler } from "../types/global"
import { sendResponse } from "../utilities/api"

export const handleCreateOneUser: ApiHandler<CreateOneUserType> = (c) => {
  const result = $createOneUser(c.get("payload"))

  if (result.isOk()) {
    return sendResponse(c, { status: 201, message: "OK" })
  }

  return sendResponse(c, { status: 500, message: "Hmm..." })
}
