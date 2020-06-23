import mongoose, { Schema, Document } from "mongoose"
import { IplayList } from "./interface"
const ObjectId = mongoose.Schema.Types.ObjectId

export interface IPlayListModel extends IplayList, Document {
	SHORT_FIELDS(): object
}

export const playListSchema: Schema = new Schema(
	{
		userId: { type: ObjectId },
		title: String,
		tracks: Array,
	},
	{
		timestamps: true,
	},
)

// Custom Methods and Properties
playListSchema.methods.SHORT_FIELDS = function (): object {
	return { id: 1, title: 1, createdAt: 1 }
}

let PlayLists = mongoose.model<IPlayListModel>("playLists", playListSchema)

PlayLists = mongoose.models.playLists || PlayLists

export default PlayLists
