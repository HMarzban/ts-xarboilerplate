import { ISongsInfo, IAlbumsInfo, IArtistInfo } from "../../services/itunes/interface"

export interface IplayList {
	userId?: string
	title?: String
	tracks?: Array<ISongsInfo | IAlbumsInfo | IArtistInfo>
	track?: ISongsInfo | IAlbumsInfo | IArtistInfo
}
