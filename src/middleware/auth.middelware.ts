import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
const { JWT_TOKEN } = process.env

const JWTtoken: any = JWT_TOKEN

export const adminAuth = (req: Request, res: Response, next: NextFunction): NextFunction | Response | void => {
	const token = req.headers["x-access-token"] || req.headers.authorization
	if (token) {
		try {
			const decode = jwt.verify(token, JWTtoken)
			req.local = {}
			req.local.admin = decode
			return next()
		} catch (error) {
			return res.status(404).send({ message: "Decoding token face to an error / Token is not valid", error })
		}
	} else {
		return res.status(403).send({ message: "Auth token required" })
	}
}

export const userAuth = (req: Request, res: Response, next: NextFunction): NextFunction | Response | void => {
	const userToken = req.headers["x-access-token"] || req.headers.authorization
	if (userToken) {
		try {
			const decode = jwt.verify(userToken, JWTtoken)
			req.local = {}
			req.local.user = decode
			return next()
		} catch (error) {
			return res.status(404).send({ message: "Decoding token face to an error / Token is not valid", error })
		}
	} else {
		return res.status(403).send({ message: "Auth token required" })
	}
}
