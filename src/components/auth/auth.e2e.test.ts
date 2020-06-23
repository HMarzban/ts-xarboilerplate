import supertest from "supertest"
import uniqid from "uniqid"
import * as faker from "faker"
import dbHandler from "../../datasources"
import appServer from "../../app"

const { MONGODB_URL } = process.env
let app: any
let request: any

describe("Auth OTP Component API E2E Test:", () => {
	const mockUser = {
		name: faker.name.findName(),
		phone: "09393424652",
		userName: faker.internet.userName,
		email: faker.internet.email(),
		password: faker.internet.password(),
	}
	let hashedCode: string
	let code: string

	beforeAll(async () => {
		await dbHandler.connect(`${MONGODB_URL}/${uniqid()}`)
		app = appServer.express
		request = supertest(app)
	})

	afterAll(async () => {
		await dbHandler.closeDatabase()
	})

	it("healthCheck", () => {
		const expected = { Result: "Ok", Success: true }
		return request
			.get("/api/v1/auth/healthCheck")
			.expect(200)
			.expect((res: any) => expect(res.body).toEqual(expect.objectContaining(expected)))
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

	it("signup", async done => {
		const user = { ...mockUser, hashedCode, code }
		const res = await request.post("/api/v1/auth/signup").send(user)
		expect(res.status).toBe(200)
		expect(res.body.Result).toEqual(
			expect.objectContaining({
				token: expect.any(String),
			}),
		)
		done()
	})

	it("otp-login", () => {
		const user = {
			phone: mockUser.phone,
			password: mockUser.password,
			hashedCode,
			code,
		}
		return request
			.post("/api/v1/auth/otp-login")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					}),
				)
			})
	})

	it("forget password", () => {
		const user = {
			phone: mockUser.phone,
		}
		return request
			.post("/api/v1/auth/forget-password")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result.registered).toEqual(true)
				hashedCode = res.body.Result.hashedCode
				code = res.body.Result.code
			})
	})

	it("reset password", () => {
		const user = {
			phone: mockUser.phone,
			password: faker.internet.password(),
			hashedCode,
			code,
		}
		return request
			.post("/api/v1/auth/reset-password")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					}),
				)
			})
	})
})

describe("Auth Component API E2E Test:", () => {
	const mockUser = {
		name: faker.name.findName(),
		phone: "09393424652",
		userName: faker.internet.userName,
		email: faker.internet.email(),
		password: faker.internet.password(),
	}
	let hashedCode: string
	let code: string

	beforeAll(async () => {
		await dbHandler.connect(`${MONGODB_URL}/${uniqid()}`)
		app = appServer.express
		request = supertest(app)
	})

	afterAll(async () => {
		await dbHandler.closeDatabase()
	})

	it("healthCheck", () => {
		const expected = { Result: "Ok", Success: true }
		return request
			.get("/api/v1/auth/healthCheck")
			.expect(200)
			.expect((res: any) => expect(res.body).toEqual(expect.objectContaining(expected)))
	})

	it("check", () => {
		return request
			.post("/api/v1/auth/check")
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
			})
	})

	it("login", () => {
		const user = {
			phone: mockUser.phone,
			password: mockUser.password,
		}
		return request
			.post("/api/v1/auth/login")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					}),
				)
			})
	})

	it("forget password", () => {
		const user = {
			phone: mockUser.phone,
		}
		return request
			.post("/api/v1/auth/forget-password")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result.registered).toEqual(true)
				hashedCode = res.body.Result.hashedCode
				code = res.body.Result.code
			})
	})

	it("reset password", () => {
		const user = {
			phone: mockUser.phone,
			password: faker.internet.password(),
			hashedCode,
			code,
		}
		return request
			.post("/api/v1/auth/reset-password")
			.send(user)
			.expect(200)
			.then((res: any) => {
				expect(res.body.Result).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					}),
				)
			})
	})
})
