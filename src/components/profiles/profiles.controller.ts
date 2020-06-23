import Profiles from "./profiles.model"
import { IProfile } from "./interface"
import { IProfileModel } from "../profiles/profiles.model"

export const getProfile = async (user: IProfileModel) => Profiles.findOne({ _id: user._id }, { password: 0 }).lean()

export const update = async (user: IProfileModel, body: IProfile) => Profiles.findOneAndUpdate({ _id: user._id }, { $set: body }, { new: true }).lean()

export const remove = (user: IProfileModel) => Profiles.findByIdAndRemove({ _id: user._id }).lean()

module.exports = {
	getProfile,
	update,
	remove,
}
