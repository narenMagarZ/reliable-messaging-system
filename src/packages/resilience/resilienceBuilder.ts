import { IResilienceProvider } from "./adapters/resilienceProvider";

export class ResilienceBuilder {
    private readonly policies: IResilienceProvider[];
    constructor() {
        this.policies = [];
    }

    addRetry(policy: IResilienceProvider): this {
        this.policies.push(policy);
        return this
    }

    addTimeout(policy: IResilienceProvider): this {
        this.policies.push(policy)
        return this;
    }

    addCircuitBreaker(policy: IResilienceProvider): this {
        this.policies.push(policy);
        return this
    }

    build() {
        return {
            // execute: <T>(fn: () => Promise<T> | T) => {
            //     const compose = this.policies.reduceRight((pV, cV) => {
            //         return () => cV.wrap(pV) 
            //     }, fn);
            //     return compose();
            // }
        }
    }
}