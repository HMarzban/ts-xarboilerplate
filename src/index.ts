import * as envFlow from "dotenv-flow"
process.env.NODE_ENV = process.env.NODE_ENV || "local"

interface flow extends envFlow.DotenvConfigOptions {
	silent: boolean
}

const enfFlowOptions: flow = { silent: true }
envFlow.config(enfFlowOptions)

import app from "./app"
import db from "./datasources"
;(async () => {
	await db.connect()
	await app.init()
})()
