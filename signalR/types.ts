
export interface ISignalRMessage {
    body: string
}

export interface IUserMessage extends ISignalRMessage{
    userName: string;
}