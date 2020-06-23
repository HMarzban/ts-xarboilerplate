import * as mongoose from "mongoose"
const router = require("../../utils").router()
import * as Auth from "./auth.controller"
import * as valid from "./auth.validator"

const Users = mongoose.models.profiles

import { Request, Response } from "express"

router.get("/healthCheck", "Ok")

router.post("/check", valid.check, (req: Request, res: Response) => {
	const { phone } = req.body
	return Auth.check(Users, phone)
})

router.post("/otp-check", valid.check, (req: Request, res: Response) => {
	const { phone } = req.body
	return Auth.otpCheck(Users, phone)
})

router.post("/signup", valid.signup, (req: Request, res: Response) => {
	const { phone, password, code, hashedCode, name } = req.body
	return Auth.signup(Users, phone, password, code, hashedCode, name)
})

router.post("/login", valid.login, (req: Request, res: Response) => {
	const { phone, password } = req.body
	return Auth.login(Users, phone, password)
})

router.post("/otp-login", valid.otpLogin, (req: Request, res: Response) => {
	const { phone, hashedCode, code } = req.body
	return Auth.otpLogin(Users, phone, hashedCode, code)
})

router.post("/forget-password", valid.forgetPassword, (req: Request, res: Response) => {
	const { phone } = req.body
	return Auth.forgetPassword(Users, phone)
})

router.post("/reset-password", valid.resetPassword, (req: Request, res: Response) => {
	const { phone, code, password, hashedCode } = req.body
	return Auth.resetPassword(Users, phone, code, password, hashedCode)
})

export default router.expressRouter
