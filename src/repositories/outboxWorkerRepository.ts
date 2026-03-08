import { IOutboxWorker, outboxWorkerModel } from "@src/models";
import { BaseRepository } from "./baseRepository";

export class OutboxWorkerRepository extends BaseRepository<IOutboxWorker> {
    constructor() {
        super(outboxWorkerModel);
    }
}