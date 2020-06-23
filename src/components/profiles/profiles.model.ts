import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import { IProfile } from "./interface"
const { SALTROUNDS } = process.env

export interface IProfileModel extends IProfile, mongoose.Document {
	PROJECT: object
}

const profilesSchema = new mongoose.Schema(
	{
		phone: { type: String, unique: true, index: { unique: true } },
		email: { type: String },
		userName: { type: String },
		name: { type: String },
		password: { type: String },
	},
	{
		timestamps: true,
	},
)

// Custom Methods and Properties
profilesSchema.statics.PROJECT = {
	TOKEN: { password: 0 },
}

profilesSchema.pre<IProfileModel>("save", function (next) {
	if (!this.isModified("password")) return next()
	const hashPassword = bcrypt.hashSync(this.password, Number(SALTROUNDS))
	if (this.password && this.password !== hashPassword) this.password = hashPassword
	next()
})

let Profiles = mongoose.model<IProfileModel>("profiles", profilesSchema)

Profiles = mongoose.models.Profiles || Profiles

export default Profiles
