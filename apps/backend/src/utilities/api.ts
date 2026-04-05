import type { Context } from "hono"
import type { StatusCode } from "hono/utils/http-status"

export function sendResponse(c: Context, payload: { status?: StatusCode; code?: string; message: string; data?: any }) {
  const { status, code, message, data } = payload
  c.status(status ?? 200)
  return c.json({ code, message, data })
}
