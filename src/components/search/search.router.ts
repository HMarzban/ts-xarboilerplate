const router = require("../../utils").router()
import { Request, Response } from "express"
import * as valid from "./search.validator"
import * as Search from "./search.controller"

router.get("/healthCheck", "Ok")

router.get("/", valid.search, async (req: Request, res: Response) => {
	const { artistName } = req.query as { artistName: string }
	return Search.albums(artistName)
})

export default router.expressRouter
