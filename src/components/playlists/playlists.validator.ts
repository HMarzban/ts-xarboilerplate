const { checkSchema, validationResult } = require("express-validator")
const excValidation = require("../../utils").excValidation(validationResult)

const createPlayListSchema = checkSchema({
	title: {
		in: ["body"],
		exists: true,
		isString: true,
	},
	track: {
		in: ["body"],
		exists: true,
		isEmpty: false,
	},
})

const updatePlayListSchema = checkSchema({
	track: {
		in: ["body"],
		exists: true,
		isEmpty: false,
	},
})

const removePlayListSchema = checkSchema({
	playListId: {
		in: ["params"],
		isMongoId: true,
		exists: true,
	},
})

export const createPlayList = [createPlayListSchema, excValidation]
export const updatePlayList = [updatePlayListSchema, excValidation]
export const removePlayList = [removePlayListSchema, excValidation]
