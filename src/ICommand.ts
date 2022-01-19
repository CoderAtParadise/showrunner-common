import { ShowHandler } from "./ShowHandler";

export interface ICommand<Data> {
    id: string;
    validate: (data?: any) => boolean;
    run: (data?: Data) => boolean;
}

const CommandRegistry = new Map<string, ICommand<any>>();

export function registerCommand<Data>(command: ICommand<Data>): void {
    if (!CommandRegistry.has(command.id))
        CommandRegistry.set(command.id, command);
}

export function commandExists(id: string): boolean {
    return CommandRegistry.has(id);
}

export function executeCommand(id: string, data?: any): boolean {
    const command = CommandRegistry.get(id);
    if (command && command.validate(data)) return command.run(data);
    return false;
}

export default { registerCommand, executeCommand };
