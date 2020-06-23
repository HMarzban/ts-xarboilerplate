const Utils = require("../../utils")
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

const { PHONE_CODE_SALT, SALTROUNDS, IS_PROD, JWT_TOKEN: jwtToken } = process.env

const JWT_TOKEN: jwt.Secret = jwtToken || ""

// Helper
const Code = {
	create: () =>
		String(Math.random())
			.replace(/^0\.0*/, "")
			.slice(0, 4),
	hash: (code: string) => bcrypt.hashSync(`${PHONE_CODE_SALT}${code}`, Number(SALTROUNDS)),
	verify: (hashedCode: string, code: string) => bcrypt.compareSync(`${PHONE_CODE_SALT}${code}`, hashedCode),
}

const isPhoneDummy = (phone: string) => /^98940/.test(phone)
const DUMMY_CODE = "9983"

/**
 * @param {String} templateName
 * @param {Object} phone
 * @param {Boolean} registered
 */
const createAndsendHashCode = async (templateName: string, { phone }: { phone: string }, registered: Boolean = false) => {
	const code = isPhoneDummy(phone) ? DUMMY_CODE : Code.create()
	const hashCode = Code.hash(code)
	const result = { hashedCode: hashCode, registered }
	if (IS_PROD === "true") {
		// Notify service must implement
		// Notify.text(templateName, phone, { code })
	} else Object.assign(result, { code })
	return result
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 */
export const check = async (Users: any, phone: string) => {
	phone = Utils.validatePhone(phone)
	const user = await Users.findOne({ phone }).lean()
	if (user) return { registered: true }

	return createAndsendHashCode("signUp", { phone })
}

/**
 *
 * @param {Object} User user mongodb collection
 * @param {String} phone
 */
export const otpCheck = async (Users: any, phone: string) => {
	phone = Utils.validatePhone(phone)
	let registered = false

	const user = await Users.findOne({ phone }).lean()
	if (user) registered = true

	return createAndsendHashCode("signUp", { phone }, registered)
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 * @param {String} password
 * @param {String} code
 * @param {String} hashedCode
 * @param {String} name
 */
export const signup = async (Users: any, phone: string, password: string, code: string, hashedCode: string, name: string) => {
	phone = Utils.validatePhone(phone)

	const findUser = await Users.findOne({ phone }).lean()
	if (findUser) return { code: "USER_FOUND", Message: "user already signup." }
	if (!Code.verify(hashedCode, code)) throw { code: "BAD_CODE" }

	phone = Utils.validatePhone(phone)

	const newUser = { phone } as { phone: string; name: string; password: string }

	if (name) newUser.name = name
	if (password) newUser.password = password
	const user = await Users.create(newUser)
	delete user.password
	const token = jwt.sign({ ...user._doc }, JWT_TOKEN)
	return { token }
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 * @param {String} password
 */
export const login = async (Users: any, phone: string, password: string) => {
	phone = Utils.validatePhone(phone)
	const user = await Users.findOne({ phone }).lean()
	if (!user) return createAndsendHashCode("signUp", user)

	if (!bcrypt.compareSync(password, user.password)) throw { message: "invalid user credentials", code: "BAD_PASS" }
	delete user.password
	const token = jwt.sign({ ...user }, JWT_TOKEN)
	return { loggedIn: true, token }
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 * @param {String} hashedCode
 * @param {String} code
 */
export const otpLogin = async (Users: any, phone: string, hashedCode: string, code: string) => {
	phone = Utils.validatePhone(phone)

	const erro: any = { code: "BAD_CODE" }

	if (!Code.verify(hashedCode, code)) throw new Error(erro)

	const user = await Users.findOne({ phone }, Users.PROJECT.TOKEN).lean()
	const token = jwt.sign({ ...user }, JWT_TOKEN)
	return { token }
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 */
export const forgetPassword = async (Users: any, phone: string) => {
	phone = Utils.validatePhone(phone)
	const user = await Users.findOne({ phone }).lean()
	if (!user) throw { Message: "user not found", code: "USER_NOT_FOUND" }
	return createAndsendHashCode("forgetPass", user, true)
}

/**
 *
 * @param {Object} Users user mongodb collection
 * @param {String} phone
 * @param {String} code
 * @param {String} password
 * @param {String} hashedCode
 */
export const resetPassword = async (Users: any, phone: string, code: string, password: string, hashedCode: string) => {
	phone = Utils.validatePhone(phone)
	const user = await Users.findOne({ phone }).lean()
	if (!user) throw { code: "USER_NOT_FOUND" }

	if (!Code.verify(hashedCode, code)) throw { code: "BAD_CODE", Message: "wrong code." }

	password = bcrypt.hashSync(password, Number(SALTROUNDS))
	const refreshUser = await Users.findOneAndUpdate({ phone }, { $set: { password } }, { projection: Users.PROJECT.TOKEN }).lean()
	const token = jwt.sign({ ...refreshUser }, JWT_TOKEN)
	return { loggedIn: true, token }
}
