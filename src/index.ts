import { IncomingMessage, Server, ServerResponse } from "node:http";

import Joi from "joi";
import "module-alias/register";
import cron from "node-cron";

import { configs } from "@src/config";
import { db } from "@src/database";
import { MessageController } from "@src/controllers";
import { IMessage } from "./models";
import { normalizeError } from "./utils";
import { MessageService, OutboxWorkerService } from "@src/services";

// validate configs
const configSchema = Joi.object({
	port: Joi.number().label("PORT").required(),
	dbHost: Joi.string().label("DB HOST").required(),
	dbPort: Joi.number().label("DB Port").required(),
	dbName: Joi.string().label("DB Name").required(),
});

const { error } = configSchema.validate(configs);

if (error) {
	console.error("Config validation error", error);
	process.exit(1);
}

async function startApp() {
	await db.connect();

	const server = new Server();

	enum HttpMethod {
		POST = "POST",
		GET = "GET",
	}

	const router = async (req: IncomingMessage, res: ServerResponse) => {
		if (req.url === "/api/v1/messages" && req.method === HttpMethod.POST) {
			let rawData: string = "";
			req.on("data", (data) => {
				rawData += data.toString("utf-8");
			});

			res.on("error", () => {
				res.statusCode = 400;
				res.end();
			});

			req.on("end", async () => {
				let body: IMessage;
				try {
					body = JSON.parse(rawData);
				} catch {
					res.writeHead(400, { "content-type": "application/json" });
					return res.end(
						JSON.stringify({
							success: false,
							message: "Invalid JSON or data!",
						}),
					);
				}
				try {
					const input: IMessage = {
						from: body.from,
						to: body.to,
						content: body.content,
						status: "pending",
					};
					await new MessageController().createMessage(input);
					res.writeHead(201, { "content-type": "application/json" });
					res.end(
						JSON.stringify({
							success: true,
							message: "Message created successfully",
						}),
					);
				} catch (error) {
					const normalizedError = normalizeError(error);
					res.writeHead(500, { "content-type": "application/json" });
					res.end(
						JSON.stringify({
							success: false,
							message: normalizedError.message,
						}),
					);
				}
			});
		} else if (
			req.url === "/api/v1/messages" &&
			req.method === HttpMethod.GET
		) {
			const messages = await new MessageController().getMessages();
			res.writeHead(200, { "content-type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					message: "Messages fetched successfully",
					data: messages,
				}),
			);
		} else {
			res.statusCode = 405;
			res.end("Method not found");
		}
	};

	server.on("request", router);

	server.on("error", (error) => {
		console.error(error, "error");
	});

	server.listen(configs.port, () => {
		console.log("Server running successfully on port", configs.port);
	});

	process.on("uncaughtException", (error) => {
		console.error("Uncaught exception error", error);
	});

	process.on("unhandledRejection", (reason) => {
		console.log("Unhandled rejection", reason);
	});

	const worker = new OutboxWorkerService(new MessageService());
	cron.schedule("* 5 * * * *", () => {
		worker.processOutboxMessages();
	});
}

startApp();
