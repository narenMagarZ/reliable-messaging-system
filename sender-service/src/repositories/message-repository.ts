import { messageModel } from "@src/models";
import { BaseRepository } from "./base-repository";

export class MessageRepository extends BaseRepository {
    constructor() {
        super(messageModel);
    }

}