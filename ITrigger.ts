import IJson from "./IJson";

export interface ITrigger{
    type:string;
}

export interface IHandler {
    JSON: IJson<ITrigger>;
}

export const handlers = new Map<string,IHandler>();

export function registerHandler(type:string,handler:IHandler): void
{
    handlers.set(type,handler);
}

const INVALID : ITrigger = {
    type: "invalid",
}

export default ITrigger;