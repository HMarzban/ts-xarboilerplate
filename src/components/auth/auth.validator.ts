import { checkSchema, validationResult } from "express-validator"
const excValidation = require("../../utils").excValidation(validationResult)

const checkPhoneSchema = checkSchema({
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
})

const signupSchema = checkSchema({
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	password: {
		in: ["body"],
		exists: true,
		isString: true,
		isLength: {
			options: { min: 5 },
		},
	},
	code: {
		in: ["body"],
		optional: true,
		isString: true,
	},
	hashedCode: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	name: {
		in: ["body"],
		exists: true,
		isString: true,
	},
})

const loginSchema = checkSchema({
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	password: {
		in: ["body"],
		exists: true,
		isString: true,
		isLength: {
			options: { min: 5 },
		},
	},
})

const otpLoginSchema = checkSchema({
	code: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	password: {
		in: ["body"],
		exists: true,
		isString: true,
		isLength: {
			options: { min: 5 },
		},
	},
})

const forgetPasswordSchema = checkSchema({
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
})

const resetPasswordSchema = checkSchema({
	phone: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	password: {
		in: ["body"],
		exists: true,
		isString: true,
		isLength: {
			options: { min: 5 },
		},
	},
	code: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	hashedCode: {
		in: ["body"],
		exists: true,
		isString: true,
	},
})

export const check = [checkPhoneSchema, excValidation]
export const signup = [signupSchema, excValidation]
export const login = [loginSchema, excValidation]
export const otpLogin = [otpLoginSchema, excValidation]
export const forgetPassword = [forgetPasswordSchema, excValidation]
export const resetPassword = [resetPasswordSchema, excValidation]
