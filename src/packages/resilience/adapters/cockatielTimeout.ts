import { timeout, TimeoutPolicy, TimeoutStrategy } from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielTimeoutAdapter implements IResilienceProvider {
	private readonly policy: TimeoutPolicy;

	constructor() {
		this.policy = timeout(30000, TimeoutStrategy.Aggressive);
	}

	wrap<T>(fn: () => Promise<T> | T): () => Promise<T> | T {
		return () => this.policy.execute(fn);
	}
}
