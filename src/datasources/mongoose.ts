import mongoose from "mongoose"
import dBugs from "debug"
import path from "path"
import findDir from "find"

interface modelIndex {
	syncIndexes: () => void
}

const debug = dBugs("db:mongoose")

const { MONGODB_URL } = process.env

const findAllModels = () => {
	return new Promise<Array<modelIndex>>(resolve => {
		findDir.file(/model.js$/, "./src", function (files: Array<string>): void {
			const data = files.map(file => {
				return require(path.resolve(file))
			})
			resolve(data)
		})
	})
}

const ensureIndexes = async (): Promise<boolean> => {
	const modelss = await findAllModels()
	await Promise.all(modelss.map(model => model.syncIndexes()))
	return true
}

export const connect = async (mongodbURL?: string): Promise<void> => {
	try {
		const URL: any = mongodbURL || MONGODB_URL
		await mongoose.connect(URL, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true, useFindAndModify: false })
		mongoose.connection.on("error", err => debug("connection/model error =>" + err))
		await ensureIndexes()
		debug(`Connected to database on Worker process: ${process.pid}, ${mongodbURL || MONGODB_URL}`)
		// console.info(`Connected to database on Worker process: ${process.pid}`)
	} catch (error) {
		debug(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
		// console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
		process.exit(1)
	}
}

export const closeDatabase = async (): Promise<void> => {
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
}

export const clearDatabase = async (): Promise<void> => {
	const collections = mongoose.connection.collections
	for (const key in collections) {
		const collection: any = collections[key]
		await collection.deleteMany()
	}
}
