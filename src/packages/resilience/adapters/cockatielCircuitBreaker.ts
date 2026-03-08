import {
	CircuitBreakerPolicy,
	handleAll,
	circuitBreaker,
	ConsecutiveBreaker,
} from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielCircuitBreakerAdapter implements IResilienceProvider{
	private readonly policy: CircuitBreakerPolicy;
	public readonly order: number;
	constructor() {
		this.order = 3;
		this.policy = circuitBreaker(handleAll, {
			halfOpenAfter: 5000,
			breaker: new ConsecutiveBreaker(3),
		});
	}

	wrap<T>(fn: () => Promise<T>): () => Promise<T> {
		return () => this.policy.execute(fn);
	}
}
