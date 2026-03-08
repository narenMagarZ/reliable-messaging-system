export interface IResilienceProvider {
    wrap<T>(fn: () => Promise<T>): () => Promise<T>;
    order: number;
}