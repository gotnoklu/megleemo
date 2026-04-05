import { Hono } from "hono"
import { logger } from "hono/logger"
import { UsersRoute } from "./routes/users"
import { sendResponse } from "./utilities/api"

const app = new Hono()

// Use logger middleware
app.use(logger())

// Create `status` route
app.get("/status", (c) => sendResponse(c, { message: "All systems healthy." }))

// Register `/users` route
app.route("/users", UsersRoute)

export default app
