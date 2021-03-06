import supertest from "supertest"
import appServer from "../../app"
let app: any
let request: any

describe("Search Itunes Component API E2E Test:", () => {
	beforeAll(async () => {
		app = appServer.express
		request = supertest(app)
	})

	it("Search for 'Lady Gaga' Albumes and its tracks", () => {
		const artistName = "Lady Gaga"
		return request
			.get(`/api/v1/search/itunes?artistName=${artistName}`)
			.expect(200)
			.then((res: any) => {
				const result = res.body.Result
				expect(result).toHaveLength(1)
				expect(result[0].artistName).toBe(artistName)
				expect(result[0].topAlbums.length).toBeGreaterThanOrEqual(3)
			})
	})

	it("Search for 'selena' Albumes and its tracks", () => {
		return request
			.get(`/api/v1/search/itunes?artistName=selena`)
			.expect(200)
			.then((res: any) => {
				const result = res.body.Result
				const artistNames = result.map((artist: any) => artist.artistName)
				const expectArtistsNames = ["Selena", "Selena Gomez", "Aubrey Selena", "Selena Seballo", "Selena Lee"]
				expect(result.length).toBeGreaterThanOrEqual(13)
				expect(artistNames).toEqual(expect.arrayContaining(expectArtistsNames))
			})
	})
})
