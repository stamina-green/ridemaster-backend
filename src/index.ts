import * as http from "http"
import reqHandler from "./router"

const server = new http.Server(reqHandler)

server.listen(3000)