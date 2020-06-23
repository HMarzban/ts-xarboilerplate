const router = require("../../utils").router()
import * as Profiles from "./profiles.controller"
import * as valid from "./profiles.validator"

import { Request, Response } from "express"

router.get("/healthCheck", "Ok")

router.get("/", (req: Request, res: Response) => {
	const user = req.local.user
	return Profiles.getProfile(user)
})

router.put("/", valid.updateProfile, (req: Request, res: Response) => {
	const user = req.local.user
	const body = req.body
	return Profiles.update(user, body)
})

router.delete("/", (req: Request, res: Response) => {
	const user = req.local.user
	return Profiles.remove(user)
})

export default router.expressRouter
