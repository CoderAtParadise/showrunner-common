export interface ICommand<Local,Data> {
    id: string;
    validate: (data:any) => boolean;
    run: (local:Local,data:Data) => void;
}

export const CommandRegisty = new Map<string,ICommand<any,any>>();

export function registerCommand<Local,Data>(command:ICommand<Local,Data>) : void {
    if(!CommandRegisty.has(command.id))
        CommandRegisty.set(command.id,command);
}

export const INVALID : ICommand<undefined,undefined> = {
    id: "invalid",
    run: (local:undefined,data:undefined) => {
        throw "Invalid Command";
    },
    validate: (data:undefined) => false,
}

export default ICommand;