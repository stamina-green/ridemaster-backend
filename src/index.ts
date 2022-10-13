import * as http from "http"
import Enquiry from "./entities/Enquiry"
import reqHandler from "./router"

Enquiry.fromAddress("Brusinkova 1974", "Melnik").then((enquiry) => {
    console.log(enquiry);
})


const server = new http.Server(reqHandler)

server.listen(3000)