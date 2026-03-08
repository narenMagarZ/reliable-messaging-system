import {
	CircuitBreakerPolicy,
	handleAll,
	circuitBreaker,
	ConsecutiveBreaker,
} from "cockatiel";
import { IResilienceProvider } from "./resilienceProvider";

export class CockatielCircuitBreakerAdapter implements IResilienceProvider{
	private readonly policy: CircuitBreakerPolicy;
	constructor() {
		this.policy = circuitBreaker(handleAll, {
			halfOpenAfter: 200,
			breaker: new ConsecutiveBreaker(5),
		});
	}

	wrap<T>(fn: () => Promise<T> | T): () => Promise<T> | T {
		return () => this.policy.execute(fn);
	}
}
