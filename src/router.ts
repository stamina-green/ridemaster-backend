import { IncomingMessage, ServerResponse } from "http";
import Enquiry from "./entities/Enquiry";
import Order from "./entities/Order";
import User from "./entities/User";

const handleCORS = (response: ServerResponse): void => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
}
const getData = async (request: IncomingMessage): Promise<string> => {
    const buffers: never[] = [];
    

    for await (const chunk of request) {
        buffers.push(chunk as never);
    }
    
    return Buffer.concat(buffers).toString();
}

export default async (req: IncomingMessage, res: ServerResponse): Promise<any> => {
    handleCORS(res)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    let data = await getData(req)
    let parsed
    try {
        parsed = JSON.parse(data)
    } catch (e) {
        res.end("Running");
        return
    }
    
    switch (req.url?.split("?")[0]) {
        case "/enquiry":
            if (!(parsed.origin && parsed.destiny)) return res.end("Need origin and destiny parameters - strings")
            try{
            const enquiry = await Enquiry.fromAddress(parsed.origin, parsed.destiny)
            return res.end(JSON.stringify(enquiry))
            } catch (e) {  
                if (e instanceof Error) {
                    return res.end(e.message)
                }
            }

        case "/enquiry/accept":
            if(!(parsed.id && parsed.userId)) return res.end("Need id and userId parameter - number")
            const enquiringUser = await User.fromId(parsed.userId);
            const order = Order.acceptEnquiry(parsed.id, enquiringUser)
            return res.end(JSON.stringify(order))
        case "/setNotificationToken":
            if(!(parsed.token && parsed.userId)) return res.end("Need token and userId - string;number");
            const result = await User.setNotificationToken(parsed.userId, parsed.token);
            return res.end(JSON.stringify(result))
        case "/register":
            if(!(parsed.email && parsed.name && parsed.password)) return res.end("Need email, name and password - strings");
            const registeredUser = await User.register(parsed.email, parsed.name, parsed.password);
            return res.end(JSON.stringify(registeredUser))
        case "/login":
            if(!(parsed.email && parsed.password)) return res.end("Need email and password - strings");
            const loggedinUser = await User.login(parsed.email, parsed.password);
            return res.end(JSON.stringify(loggedinUser))

        default:
            res.end("404 NOT FOUND")
            break;
    }
}
