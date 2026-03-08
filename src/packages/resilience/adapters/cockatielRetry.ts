import { handleAll, retry, RetryPolicy } from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielRetryAdapter implements IResilienceProvider {
	private readonly policy: RetryPolicy;
	constructor() {
		this.policy = retry(handleAll, {});
	}

	wrap<T>(fn: () => Promise<T> | T): () => Promise<T> | T {
		return () => this.policy.execute(fn);
	}
}
