import * as app from "./bin/www"
import middleware from "./middleware"
import searchItunes from "./components/search"
import profiles from "./components/profiles"
import auth from "./components/auth"
import playlists from "./components/playlists"

// middleware inject
app.use(middleware)
// router inject
app.use("/api/v1", [auth, profiles, playlists, searchItunes])

export default app
