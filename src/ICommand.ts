import { ShowHandler } from "./ShowHandler";

export interface CommandReturn {
    status: number;
    error?: string;
    message?: string;
}

export interface ICommand<Data> {
    id: string;
    validate: (data?: any) => CommandReturn | undefined;
    run: (data?: Data) => CommandReturn;
}

const CommandRegistry = new Map<string, ICommand<any>>();

export function registerCommand<Data>(command: ICommand<Data>): void {
    if (!CommandRegistry.has(command.id))
        CommandRegistry.set(command.id, command);
}

export function executeCommand(id: string, data?: any): CommandReturn {
    const command = CommandRegistry.get(id);
    if (command) {
        const valid = command.validate(data);
        if (valid !== undefined) return valid;
            return command.run(data);
    }
    return {
        status: 404,
        error: "unknownCommand",
        message: `Unknown Command ${id}`
    };
}

export default { registerCommand, executeCommand };
