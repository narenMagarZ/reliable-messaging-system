
export const normalizeError = (error: unknown) => {
    if (error instanceof Error) {
        return error
    } else {
        return typeof error === 'string' ? new Error(error) : new Error(JSON.stringify(error));
    }
}