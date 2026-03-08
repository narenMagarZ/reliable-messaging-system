import { IOutboxWorker, OutboxWorkerDocument } from "@src/models";
import {
	CockatielCircuitBreakerAdapter,
	CockatielRetryAdapter,
	CockatielTimeoutAdapter,
	ResilienceBuilder,
} from "@src/packages";
import { OutboxWorkerRepository } from "@src/repositories";
import { MessageService } from "@src/services";
import mongoose, { QueryFilter } from "mongoose";

export class OutboxWorkerService {
	private readonly repository: OutboxWorkerRepository;
	constructor(private readonly messageService: MessageService) {
		this.repository = new OutboxWorkerRepository();
	}

	create(input: IOutboxWorker) {
		this.repository.create(input);
	}

	async processOutboxMessages() {
		const outboxMessages = await this.findAll({ status: "created" });
		const resiliencePipeline = new ResilienceBuilder()
			.addTimeout(new CockatielTimeoutAdapter())
			.addRetry(new CockatielRetryAdapter())
			.addCircuitBreaker(new CockatielCircuitBreakerAdapter())
			.build();

		for (let i = 0; i < outboxMessages.length; i++) {
			const outboxMessage = outboxMessages[i];
			const outboxMessageId = outboxMessage?._id.toString()!;
			const messageId = (outboxMessage?.content as { _id: mongoose.ObjectId } )._id.toString()!;

			try {
				await mongoose.connection.transaction(async () => {
					await resiliencePipeline.execute(async () => {
						await this.messageService.updateOne(messageId, { status: "created" });
					});
					await this.updateOne(outboxMessageId, { status: 'completed' });
				})
			} catch (error) {
				console.error("Failed to create message", error);				
			}
			
		}
	}

	public async updateOne(id: string, input: Pick<IOutboxWorker, "status">) {
		return this.repository.updateOne(
			{
				_id: id,
			},
			input,
		);
	}

	public async findAll(params: {
		status?: string;
	}): Promise<Array<OutboxWorkerDocument>> {
		let filter: QueryFilter<IOutboxWorker> = {};
		if (params.status) {
			filter = { ...filter, status: params.status };
		}
		return this.repository.findAll(
			filter,
			{ _id: 1, content: 1, status: 1 },
			{ sort: { createdAt: -1 } },
		);
	}
}
