import mongoose from "mongoose";

import { IMessage } from "@src/models";
import { MessageRepository, OutboxWorkerRepository } from "@src/repositories";

export class MessageService {
	private readonly repository: MessageRepository;
	private readonly outboxWorkerRepository: OutboxWorkerRepository;
	constructor() {
		this.repository = new MessageRepository();
		this.outboxWorkerRepository = new OutboxWorkerRepository();
	}

	public async create(input: IMessage) {
		const message = await mongoose.connection.transaction(async () => {
			const message = await this.repository.create(input);
			await this.outboxWorkerRepository.create({
				messageType: "message.published",
				content: {},
				status: "created",
			});
			return message;
		});
		return message;
	}

	public async findAll(): Promise<Array<IMessage>> {
		return this.repository.findAll(
			{},
			{ _id: 1, from: 1, content: 1, to: 1, status: 1 },
			{ sort: { createdAt: -1 } },
		);
	}
}
