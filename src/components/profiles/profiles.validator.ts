import { checkSchema, validationResult } from "express-validator"
const excValidation = require("../../utils").excValidation(validationResult)

const updateProfileSchema = checkSchema({
	phone: {
		in: ["body"],
		isString: true,
		optional: true,
	},
	name: {
		in: ["body"],
		isString: true,
		optional: true,
	},
	userName: {
		in: ["body"],
		isString: true,
		optional: true,
	},
	email: {
		in: ["body"],
		isEmail: true,
		optional: true,
		isString: true,
	},
})

export const updateProfile = [updateProfileSchema, excValidation]
