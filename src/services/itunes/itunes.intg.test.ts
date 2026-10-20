import { search } from "./index"

describe("Service: Search ituns for Artists", () => {
	it("Search for 'Lady Gaga' Albumes and its tracks ", async () => {
		const artistName = "Lady Gaga"
		const results = await search(artistName)
		const ladyGaga = results.find(artist => artist.artistName === artistName)
		expect(results.length).toBeGreaterThanOrEqual(1)
		expect(ladyGaga).toBeDefined()
		expect(ladyGaga!.topAlbums.length).toBeGreaterThanOrEqual(3)
	})

	it("Search for 'selena' Albumes and its tracks ", async () => {
		const artistName = "selena"
		const results = await search(artistName)
		const artistNames = results.map(artist => artist.artistName)
		const expectArtistsNames = ["Selena", "Selena Gomez"]
		expect(results.length).toBeGreaterThanOrEqual(13)
		expect(artistNames).toEqual(expect.arrayContaining(expectArtistsNames))
	})
})
