import { IncomingMessage, ServerResponse } from "http";

import directionManager from "./directionManager";
import findPlaceMan from "./findPlaceMan";

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
        res.end();
        throw new Error("Message is not a valid JSON")
    }
    

    switch (req.url?.split("?")[0]) {
        case "/routekm":
            if (!(parsed.origin && parsed.destiny)) return res.end("Need origin and destiny parameters - strings")
            const a: string = JSON.stringify(await directionManager(parsed.origin, parsed.destiny))
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(a)
            res.end()

            break;
        
        case "/placeGet": 
            if (!parsed.origin) return res.end("Need origin parameter - string")
            const c: string = JSON.stringify(await findPlaceMan(parsed.origin))
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(c)
            res.end()

            break
        default:
            res.end("404 NOT FOUND")
            break;
    }
}