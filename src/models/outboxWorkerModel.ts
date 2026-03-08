import mongoose, { Schema } from "mongoose";

export interface IOutboxWorker {
	status: string;
	messageType: string;
	content: object;
}

const outboxWorkerSchema = new Schema<IOutboxWorker>(
	{
		status: {
			type: String,
			required: true,
		},
		messageType: {
			type: String,
			required: true,
		},
		content: {
			type: Schema.Types.Mixed,
			required: true,
		},
	},
	{ timestamps: true },
);

export const outboxWorkerModel = mongoose.model(
	"outbox_workers",
	outboxWorkerSchema,
);
