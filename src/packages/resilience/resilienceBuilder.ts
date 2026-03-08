import { IResilienceProvider } from "@src/packages/resilience";

export class ResilienceBuilder {
	private readonly policies: IResilienceProvider[];
	constructor() {
		this.policies = [];
	}

	addRetry(policy: IResilienceProvider): this {
		this.policies.push(policy);
		return this;
	}

	addTimeout(policy: IResilienceProvider): this {
		this.policies.push(policy);
		return this;
	}

	addCircuitBreaker(policy: IResilienceProvider): this {
		this.policies.push(policy);
		return this;
	}

	build() {
		const sortedPolicies = this.policies.sort((a, b) => b.order - a.order);
		return {
			execute: <T>(fn: () => Promise<T>) => {
				const compose = sortedPolicies.reduceRight((current, next) => {
					return next.wrap(current);
				}, fn);
				return compose();
			},
		};
	}
}