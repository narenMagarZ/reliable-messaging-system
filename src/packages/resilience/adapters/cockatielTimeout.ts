import { timeout, TimeoutPolicy, TimeoutStrategy } from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielTimeoutAdapter implements IResilienceProvider {
	private readonly policy: TimeoutPolicy;
	public readonly order: number;
	constructor() {
		this.order = 1;
		this.policy = timeout(30000, TimeoutStrategy.Aggressive);
	}

	wrap<T>(fn: () => Promise<T>): () => Promise<T> {
		return () => this.policy.execute(fn);
	}
}
