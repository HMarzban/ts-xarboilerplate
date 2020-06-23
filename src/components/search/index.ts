import express from "express"
import Search from "./search.router"
const app = express()

app.use("/search/itunes", Search)

export default app
