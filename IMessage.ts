import IJson from "./IJson"

export interface IMessage{
    type: string;
}

export interface IHandler {
    JSON : IJson<IMessage>;
}

export const handlers = new Map<string,IHandler>();

export function registerHandler(type:string,handler:IHandler) : void
{
    handlers.set(type,handler);
}

export const INVALID : IMessage = {
    type: "invalid",
}

export default IMessage;