import { Model, QueryFilter, ProjectionType, QueryOptions } from "mongoose";

export class BaseRepository<TModel> {
    constructor(private model: Model<TModel>) {
        this.model = model;
    }

    create(model: TModel) {
        return this.model.create(model);
    }

    findAll(filter: QueryFilter<TModel>, projection: ProjectionType<TModel>, options: QueryOptions<TModel>) {
        return this.model.find(filter, projection, options);
    }
}