import supertest from "supertest"
import uniqid from "uniqid"
import * as faker from "faker"
import dbHandler from "../../datasources"
import appServer from "../../app"

const { MONGODB_URL } = process.env
let app: any
let request: any

describe("PlayLists Component API E2E Test:", () => {
	const mockTrack = () => {
		return {
			wrapperType: "track",
			kind: "song",
			artistId: faker.random.number(10),
			collectionId: faker.random.number(10),
			trackId: faker.random.number(10),
			artistName: "Selena Gomez",
			collectionName: "Revival (Deluxe)",
			trackName: "Me & the Rhythm",
			collectionCensoredName: "Revival (Deluxe)",
			trackCensoredName: "Me & the Rhythm",
		}
	}
	let mockPlayList = {
		title: faker.name.title(),
		track: mockTrack(),
		userId: null,
		_id: null,
	}

	const mockUser1 = {
		name: faker.name.findName(),
		phone: "09393424651",
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	}

	let userToken1: any

	beforeAll(async () => {
		await dbHandler.connect(`${MONGODB_URL}/${uniqid()}`)
		app = appServer.express
		request = supertest(app)
	})

	afterAll(async () => {
		await dbHandler.closeDatabase()
	})

	it("suignup users", async done => {
		const check1 = await request.post("/api/v1/auth/otp-check").send({ phone: mockUser1.phone })
		expect(check1.status).toBe(200)
		expect(check1.body.Result.registered).toEqual(false)

		const user1 = {
			...mockUser1,
			hashedCode: check1.body.Result.hashedCode,
			code: check1.body.Result.code,
		}
		const signup1 = await request.post("/api/v1/auth/signup").send(user1)
		expect(signup1.body.Result).toEqual(expect.objectContaining({ token: expect.any(String) }))
		userToken1 = signup1.body.Result.token

		done()
	})

	it("Create a new playList and add current track to it", () => {
		return request
			.post("/api/v1/playlists")
			.set({ Authorization: userToken1 })
			.send(mockPlayList)
			.expect(200)
			.expect((res: any) => {
				const resutl = res.body.Result
				expect(resutl).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						title: expect.any(String),
						tracks: expect.any(Array),
					}),
				)
				expect(resutl.tracks).toHaveLength(1)
				mockPlayList = resutl
			})
	})

	it("Add a new Track to the Exist Playlist", () => {
		return request
			.put(`/api/v1/playlists/${mockPlayList._id}`)
			.set({ Authorization: userToken1 })
			.send({ track: mockTrack() })
			.expect(200)
			.expect((res: any) => {
				const resutl = res.body.Result
				expect(resutl).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						title: expect.any(String),
						tracks: expect.any(Array),
					}),
				)
				expect(resutl.tracks).toHaveLength(2)
				mockPlayList = resutl
			})
	})

	it("Fetch The user PlayLists", () => {
		return request
			.get(`/api/v1/playlists`)
			.set({ Authorization: userToken1 })
			.expect(200)
			.expect((res: any) => {
				const result = res.body.Result
				expect(result.Total).toBeGreaterThanOrEqual(1)
				expect(result.Result.length).toBeGreaterThanOrEqual(1)
			})
	})

	it("Fetch The user PlayList", () => {
		return request
			.get(`/api/v1/playlists/${mockPlayList._id}`)
			.set({ Authorization: userToken1 })
			.expect(200)
			.expect((res: any) => {
				const result = res.body.Result
				expect(result.tracks.length).toBeGreaterThanOrEqual(2)
			})
	})

	it("Remove a playList", () => {
		return request
			.delete(`/api/v1/playlists/${mockPlayList._id}`)
			.set({ Authorization: userToken1 })
			.expect(200)
			.then((res: any) => expect(res.body.Result._id).toEqual(mockPlayList._id))
	})
})
