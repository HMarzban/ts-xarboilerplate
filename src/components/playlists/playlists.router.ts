const router = require("../../utils").router()
import * as PlayLists from "./playlists.controller"
import * as valid from "./playlists.validator"
import { Request, Response } from "express"

router.get("/healthCheck", "Ok")

router.get("/", (req: Request, res: Response) => {
	const queryString = req.queryString
	const user = req.local.user
	return PlayLists.getAll(queryString, user)
})

router.get("/:playListId", (req: Request, res: Response) => {
	const { playListId } = req.params
	const user = req.local.user
	return PlayLists.getOne(playListId, user)
})

router.post("/", valid.createPlayList, (req: Request, res: Response) => {
	const body = req.body
	const user = req.local.user
	return PlayLists.create(user, body)
})

router.put("/:playListId", valid.updatePlayList, (req: Request, res: Response) => {
	const { playListId } = req.params
	const body = req.body
	return PlayLists.update(playListId, body)
})

router.delete("/:playListId", valid.removePlayList, (req: Request, res: Response) => {
	const { playListId } = req.params
	return PlayLists.remove(playListId)
})

export default router.expressRouter
