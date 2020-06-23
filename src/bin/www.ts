import app from "express"
import http, { Server } from "http"
import chalk from "chalk"
import dBugs from "debug"

export const express = app()

const debug = dBugs("http")

const { PORT, NODE_ENV } = process.env

express.set("port", PORT)

function onError(error: any) {
	if (error.syscall !== "listen") throw error

	const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			debug(bind + " requires elevated privileges")
			process.exit(1)
		case "EADDRINUSE":
			debug(bind + " is already in use")
			process.exit(1)
		default:
			throw error
	}
}

export const use = (...arg: any): void => {
	if (arg.length) express.use(...arg)
}

export const init = () => {
	return new Promise(resolve => {
		const server: Server = http.createServer(express)
		server.listen(PORT)
		server.on("error", onError)
		server.on("listening", () => {
			const addr: any = server.address()
			const address = addr.address === "::" ? chalk.bold.underline.yellow(`http://localhost:${addr.port}`) : chalk.bold.underline.yellow(`${addr.address}:${addr.port}`)
			debug(`Server started on Port ${chalk.blue.yellow(PORT)} , NODE_ENV: ${chalk.blue.yellow(NODE_ENV)}, Access to Project: ${address} (ctrl+click)`)
			resolve(true)
		})
	})
}
