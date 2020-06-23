import Auth from "./auth.router"
import express from "express"
const app = express()

app.use("/auth", Auth)

export default app
