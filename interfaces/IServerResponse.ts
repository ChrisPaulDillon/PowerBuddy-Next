
export interface IServerResponse<T> {
    data: T,
    status: number,
    statusText: string;
}