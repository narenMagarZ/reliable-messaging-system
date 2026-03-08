import { IOutboxWorker } from "@src/models";
import { OutboxWorkerRepository } from "@src/repositories";

export class OutboxWorkerService {
    private readonly repository: OutboxWorkerRepository;
    constructor() {
        this.repository = new OutboxWorkerRepository();
    }

    create(input: IOutboxWorker) {
        this.repository.create(input)
    }

}