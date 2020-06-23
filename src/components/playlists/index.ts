import { userAuth } from "../../middleware/auth.middelware"
import express from "express"
import PlayLists from "./playlists.router"
const app = express()

app.use("/playlists", userAuth, PlayLists)

export default app
