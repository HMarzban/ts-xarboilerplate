export interface IArtistInfo {
	wrapperType: string
	artistType: string
	artistName: string
	artistLinkUrl: string
	artistId: number
	amgArtistId: number
	primaryGenreName: string
	primaryGenreId: number
	topAlbums: Array<IAlbumsInfo>
}

export interface IMusicArtist {
	resultCount: number
	results: Array<IArtistInfo>
}

export interface ISearchArticts {
	artists: Array<IArtistInfo>
	artistsId: string
}

export interface IAlbumsInfo {
	wrapperType: string
	collectionType: string
	artistId: number
	collectionId: number
	amgArtistId: number
	artistName: string
	collectionName: string
	collectionCensoredName: string
	artistViewUrl: string
	collectionViewUrl: string
	artworkUrl60: string
	artworkUrl100: string
	collectionPrice: number
	collectionExplicitness: string
	trackCount: number
	copyright: string
	country: string
	currency: string
	releaseDate: Date
	primaryGenreName: string
	tracks: Array<ISongsInfo>
}

export interface IAlbums {
	resultCount: number
	results: Array<IAlbumsInfo>
}

export interface ISearchAlbums {
	albums: Array<IAlbumsInfo>
	albumsId: string
}

export interface ISongsInfo {
	wrapperType: string
	kind: string
	artistId: number
	collectionId: number
	trackId: number
	artistName: string
	collectionName: string
	trackName: string
	collectionCensoredName: string
	trackCensoredName: string
	artistViewUrl: string
	collectionViewUrl: string
	trackViewUrl: string
	previewUrl: string
	artworkUrl30: string
	artworkUrl60: string
	artworkUrl100: string
	collectionPrice: number
	trackPrice: number
	releaseDate: Date
	collectionExplicitness: string
	trackExplicitness: string
	discCount: number
	discNumber: number
	trackCount: number
	trackNumber: number
	trackTimeMillis: number
	country: string
	currency: string
	isStreamable: boolean
}

export interface ISongs {
	resultCount: number
	results: Array<ISongsInfo>
}

export interface ISearchSongs {
	[key: string]: Array<ISongsInfo>
}
