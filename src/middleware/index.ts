import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import helmet from "helmet"
import morgan from "morgan"
import chalk from "chalk"

import { Express, Request, Response, NextFunction } from "express"

const express = require("express")
const app: Express = express()

app.use(morgan(`${chalk.green("[morgan]")} :method :url :status - :response-time ms`))

app.use(helmet())

app.use((req: Request, res: Response, next: NextFunction): NextFunction | void => {
	const queryString = req.url.split("?")[1] || ""
	req.queryString = queryString
	next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true, limits: { fileSize: 2 * 1024 * 1024 } }))

export default app
