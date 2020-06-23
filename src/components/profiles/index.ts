import express from "express"
import Profiles from "./profiles.router"
import { userAuth } from "../../middleware/auth.middelware"
const app = express()
app.use("/profiles", userAuth, Profiles)

export default app
