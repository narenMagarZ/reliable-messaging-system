import { IMessage } from "@src/models";
import { MessageService } from "@src/services";

export class MessageController {
    private readonly messageService: MessageService;
    constructor() {
        this.messageService = new MessageService();
    }
    public async createMessage(input: IMessage) {
        return this.messageService.create(input);
    }

    public async getMessages() {
        return this.messageService.findAll({});
    }

}