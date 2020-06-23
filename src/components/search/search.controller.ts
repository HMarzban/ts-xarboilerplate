const Itunes = require("../../services/itunes")
export const albums = (artistName: string) => Itunes.search(artistName)
