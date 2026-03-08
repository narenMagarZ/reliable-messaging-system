import {
	Model,
	QueryFilter,
	ProjectionType,
	QueryOptions,
	UpdateWithAggregationPipeline,
	UpdateQuery,
	MongooseUpdateQueryOptions,
} from "mongoose";

export class BaseRepository<WDocument, RDocument> {
	constructor(private model: Model<WDocument>) {
		this.model = model;
	}

	create(model: WDocument) {
		return this.model.create(model);
	}

	findAll(
		filter: QueryFilter<WDocument>,
		projection: ProjectionType<WDocument>,
		options: QueryOptions<WDocument>,
	 ) {
		return this.model.find(filter, projection, options);
	}

	updateOne(
		filter: QueryFilter<RDocument>,
		input: UpdateWithAggregationPipeline | UpdateQuery<WDocument>,
		options?: MongooseUpdateQueryOptions<WDocument> | null | undefined,
	) {
		return this.model.updateOne(filter, input, options);
	}
}
