import { ShowHandler } from "./ShowHandler";

export interface ICommand<Data> {
    id: string;
    validate: (data?: any) => boolean;
    run: (handler: ShowHandler, data?: Data) => void; // TODO: change handler type to actual type
}

const CommandRegistry = new Map<string, ICommand<any>>();

export function registerCommand<Data>(command: ICommand<Data>): void {
    if (!CommandRegistry.has(command.id))
        CommandRegistry.set(command.id, command);
}

export function executeCommand(
    handler: ShowHandler,
    id: string,
    data?: any
): boolean {
    const command = CommandRegistry.get(id);
    if (command && command.validate(data)) command.run(handler, data);
    return false;
}

export default { registerCommand, executeCommand };