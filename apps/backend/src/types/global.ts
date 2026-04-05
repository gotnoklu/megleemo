import type { Env, Handler, Input } from "hono"
import type { BlankInput, HandlerResponse } from "hono/types"
import type { Result } from "../libraries/result"

export type ApiHandler<
  Data extends Env["Variables"] = any,
  P extends string = any,
  I extends Input = BlankInput,
  R extends HandlerResponse<any> = any,
> = Handler<{ Variables: { payload: Data } }, P, I, R>

export type ServiceHandler<Payload = any, Output extends Result<any, unknown> = Result<any, unknown>> = (payload: Payload) => Output
