import { checkSchema, validationResult } from "express-validator"
const excValidation = require("../../utils").excValidation(validationResult)

const searchSchema = checkSchema({
	artistName: {
		in: ["query"],
		exists: true,
		isString: true,
	},
})

export const search = [searchSchema, excValidation]
