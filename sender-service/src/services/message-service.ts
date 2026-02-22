import { MessageRepository } from "@src/repositories";


export class MessageService {
    private readonly repository: MessageRepository;
    constructor() {
        this.repository = new MessageRepository();
    }

    public async createMessage() {
        return this.repository.create();
    }

    public async findAll() {
        return this.repository.findAll();
    }
}