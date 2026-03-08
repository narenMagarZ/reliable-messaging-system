import { handleAll, retry, RetryPolicy } from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielRetryAdapter implements IResilienceProvider {
	private readonly policy: RetryPolicy;
	public readonly order: number;
	constructor() {
		this.order = 2;
		this.policy = retry(handleAll, {
			maxAttempts: 5
		});
	}

	wrap<T>(fn: () => Promise<T>): () => Promise<T> {
		return () => this.policy.execute(fn);
	}
}
