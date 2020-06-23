import { q2ma } from "../../utils"
import PlayLists, { IPlayListModel } from "./playlists.model"
import { IProfileModel } from "../profiles/profiles.model"
import { IplayList } from "./interface"

export const getAll = (queryString: string, user: IProfileModel) => {
	const filter = { userId: user._id }
	// TODO: get method or statics type does not find
	const project = /* PlayLists.SHORT_FIELDS() || */ {}
	const options: any = { filter, queryString, project, collectionName: PlayLists }
	return q2ma(options)
}

export const getOne = (playListId: string, user: IProfileModel) => {
	const filter = { _id: playListId, userId: user._id }
	return PlayLists.findOne(filter).lean()
}

export const create = (user: IProfileModel, body: IPlayListModel) => {
	const track: any = body.track
	const task: IplayList = {
		tracks: [track],
		title: body.title,
		userId: user._id,
	}
	return PlayLists.create(task)
}

export const update = (playListId: string, body: IPlayListModel) =>
	PlayLists.findOneAndUpdate({ _id: playListId }, { $push: { tracks: body.track } }, { new: true }).lean()

export const remove = (playListId: string) => PlayLists.findByIdAndRemove({ _id: playListId }).lean()
