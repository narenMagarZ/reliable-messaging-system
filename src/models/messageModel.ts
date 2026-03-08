import mongoose, { Schema } from "mongoose";

export interface IMessage {
	from: string;
	to: string;
	content: string;
	status: string;
}

const messageSchema = new Schema<IMessage>(
	{
		from: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export const messageModel = mongoose.model("messages", messageSchema);