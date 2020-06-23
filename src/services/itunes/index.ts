const superagent = require("superagent")

const ITUNES_URL = "https://itunes.apple.com"
import { ISearchArticts, IMusicArtist, ISearchAlbums, IAlbums, ISearchSongs, ISongs, IAlbumsInfo, IArtistInfo } from "./interface"

const searchArticts = async (artistName: string): Promise<ISearchArticts> => {
	const URL = `${ITUNES_URL}/search?term=${artistName}&entity=musicArtist`

	let result = await superagent.get(URL)

	if (result.status !== 200) throw new Error("search bad happend" + result.status)

	const artists: IMusicArtist = JSON.parse(result.text)
	const artistsId = artists.results.map(el => el.artistId).join(",")
	return { artists: artists.results, artistsId }
}

const searchAlbums = async (artistsId: string): Promise<ISearchAlbums> => {
	const URL = `${ITUNES_URL}/lookup?id=${artistsId}&entity=album&limit=3&sort=top`
	let result = await superagent.get(URL)
	if (result.status !== 200) throw new Error("search bad happend" + result.status)

	const albums: IAlbums = JSON.parse(result.text)
	const albumsFilter = albums.results.filter(album => album.collectionType === "Album")

	const albumsId = albumsFilter
		.map(el => el.collectionId & el.collectionId)
		.filter(Number)
		.join(",")

	return { albums: albumsFilter, albumsId }
}

const searchSongs = async (albumsId: string): Promise<ISearchSongs> => {
	const URL = `${ITUNES_URL}/lookup?id=${albumsId}&entity=song`
	let result = await superagent.get(URL)
	if (result.status !== 200) throw new Error("search bad happend" + result.status)

	const songs: ISongs = JSON.parse(result.text)

	const albumList: ISearchSongs = {}
	songs.results.forEach(song => {
		if (song.wrapperType === "collection") albumList[song.collectionId] = []
		else albumList[song.collectionId].push(song)
	})

	return albumList
}

const search = async (artistName: string): Promise<Array<IArtistInfo>> => {
	if (!artistName) return []

	const { artists, artistsId } = await searchArticts(artistName)

	const { albums, albumsId } = await searchAlbums(artistsId)

	const albumSongs = await searchSongs(albumsId)

	// bind album songs
	albums.forEach((val: IAlbumsInfo, index: number) => {
		if (albumSongs[val.collectionId] && albumSongs[val.collectionId].length) albums[index].tracks = albumSongs[val.collectionId]
	})

	// bind album to artists
	artists.forEach((artist, index) => {
		const artistAlbums = albums.filter(album => album.artistId === artist.artistId)
		if (artistAlbums) artists[index].topAlbums = artistAlbums
	})

	return artists
}

export { searchArticts, searchAlbums, searchSongs, search }
