import { IncomingMessage, Server, ServerResponse } from "node:http"
import Joi from "joi";
import 'module-alias/register';

import { configs } from "@src/config";

// validate configs
const configSchema = Joi.object({
    port: Joi.number().label("PORT").required()
});

const { error } = configSchema.validate(configs);

if (error) {
    console.error("Config validation error", error);
    process.exit(1);
}

const server = new Server();

enum HttpMethod {
    POST = "POST",
    GET = "GET"
}


const router = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/v1/messages' && req.method === HttpMethod.POST) {
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({
            "success": true, 
            "message": "Message create successfully", 
            "code": 201
        }));
    } else if (req.url === '/api/v1/messages' && req.method === HttpMethod.GET) {
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({
            "success": true, 
            "message": "Messages fetched successfully", 
            "code": 200
        }));
    } else {
        res.statusCode = 405;
        res.end("Method not found");
    }
}


server.on("request", router);

server.on("error", (error) => {
    console.error(error);
});


server.listen(configs.port, () => {
    console.log("Server running successfully on port", configs.port);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception error", error);
});

process.on("unhandledRejection", (reason) => {
    console.log("Unhandled rejection", reason)
});