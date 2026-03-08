import { IOutboxWorker, outboxWorkerModel, OutboxWorkerDocument } from "@src/models";
import { BaseRepository } from "./baseRepository";

export class OutboxWorkerRepository extends BaseRepository<IOutboxWorker, OutboxWorkerDocument> {
    constructor() {
        super(outboxWorkerModel);
    }
}