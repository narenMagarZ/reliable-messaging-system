import mongoose, { QueryFilter } from "mongoose";

import { IMessage, MessageDocument } from "@src/models";
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
				content: { ...message },
				status: "created",
			});
			return message;
		});
		return message;
	}

	public async findAll(params: {
		status?: string;
	}): Promise<Array<MessageDocument>> {
		let filter: QueryFilter<IMessage> = {};
		if (params.status) {
			filter = { ...filter, status: params.status };
		}
		return this.repository.findAll(
			filter,
			{ _id: 1, id: 1, from: 1, content: 1, to: 1, status: 1 },
			{ sort: { createdAt: -1 } },
		);
	}

	public async updateOne(id: string, input: Pick<IMessage, "status">) {
		return this.repository.updateOne(
			{
				_id: id,
			},
			input,
		);
	}
}
