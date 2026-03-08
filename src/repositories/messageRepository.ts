import { IMessage, MessageDocument, messageModel } from "@src/models";
import { BaseRepository } from "./baseRepository";

export class MessageRepository extends BaseRepository<IMessage, MessageDocument> {
    constructor() {
        super(messageModel);
    }
}