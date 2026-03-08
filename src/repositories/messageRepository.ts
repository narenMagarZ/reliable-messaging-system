import { IMessage, messageModel } from "@src/models";
import { BaseRepository } from "./baseRepository";

export class MessageRepository extends BaseRepository<IMessage> {
    constructor() {
        super(messageModel);
    }
}