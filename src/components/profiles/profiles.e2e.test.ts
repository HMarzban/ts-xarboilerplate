import * as jwtJsDecode from "jwt-js-decode"
import supertest from "supertest"
import uniqid from "uniqid"
import * as faker from "faker"
import dbHandler from "../../datasources"
import appServer from "../../app"

const { MONGODB_URL } = process.env
let app: any
let request: any

describe("Profile Component API E2E Test:", () => {
	const mockUser = {
		name: faker.name.findName(),
		phone: "09393424652",
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	}

	let mockProject = {
		projectName: faker.name.title(),
		description: faker.name.jobDescriptor(),
		userId: null,
		_id: null,
	}

	let mockTask = {
		title: faker.name.title(),
		projectId: null,
		content: faker.name.jobDescriptor(),
		userAssignment: null,
	}

	let hashedCode: string
	let code: string
	let userToken: string

	beforeAll(async () => {
		await dbHandler.connect(`${MONGODB_URL}/${uniqid()}`)
		app = appServer.express
		request = supertest(app)
	})

	afterAll(async () => {
		await dbHandler.closeDatabase()
	})

	it("otp-check", () => {
		return request
			.post("/api/v1/auth/otp-check")
			.send({ phone: mockUser.phone })
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result.registered).toEqual(false)
				hashedCode = res.body.Result.hashedCode
				code = res.body.Result.code
			})
	})

	it("signup", () => {
		const user = { ...mockUser, hashedCode, code }
		return request
			.post("/api/v1/auth/signup")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					}),
				)
				userToken = res.body.Result.token
			})
	})

	it("healthCheck", () => {
		const expected = { Result: "Ok", Success: true }
		return request
			.get("/api/v1/profiles/healthCheck")
			.set({ Authorization: userToken })
			.expect(200)
			.expect((res: any) => expect(res.body).toEqual(expect.objectContaining(expected)))
	})

	it("Getting profile data", () => {
		return request
			.get("/api/v1/profiles")
			.set({ Authorization: userToken })
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result.phone).not.toEqual(mockUser.phone)
				expect(res.body.Result.phone).toMatch(mockUser.phone.slice(1, 100))
			})
	})

	it("Update a user profile", () => {
		return request
			.put(`/api/v1/profiles`)
			.set({ Authorization: userToken })
			.send({ name: "jojo" })
			.expect(200)
			.then((res: any) => expect(res.body.Result.name).toEqual("jojo"))
	})

	it("Remove a user profile", () => {
		const jwt = jwtJsDecode.jwtDecode(userToken)
		return request
			.delete(`/api/v1/profiles`)
			.set({ Authorization: userToken })
			.expect(200)
			.then((res: any) => expect(res.body.Result._id).toEqual(jwt.payload._id))
	})
})
