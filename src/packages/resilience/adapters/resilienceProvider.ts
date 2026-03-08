export interface IResilienceProvider {
    wrap<T>(fn: () => Promise<T> | T): () => Promise<T> | T
}