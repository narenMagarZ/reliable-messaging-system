import { Model } from "mongoose";

export class BaseRepository {
    constructor(private model: Model<any>) {
        this.model = model;
    }

    create() {
        return this.model.create();
    }

    findAll() {
        return this.model.find({});
    }
}