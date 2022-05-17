export interface CommandReturn {
    status: number;
    error?: string;
    message: string | string[] | number | number[] | object | object[];
}

export interface ICommand<Data> {
    id: string;
    validate: (data?: any) => CommandReturn | undefined;
    run: (
        commandInfo: { show: string; session: string },
        data?: Data
    ) => CommandReturn;
}

const CommandRegistry = new Map<string, ICommand<any>>();

export function registerCommand<Data>(command: ICommand<Data>): void {
    if (!CommandRegistry.has(command.id))
        CommandRegistry.set(command.id, command);
}

export function executeCommand(
    commandInfo: { id: string; show: string; session: string },
    data?: any
): CommandReturn {
    const command = CommandRegistry.get(commandInfo.id);
    if (command) {
        const valid = command.validate(data);
        if (valid !== undefined) return valid;
        return command.run(commandInfo, data);
    }
    return {
        status: 404,
        error: "unknownCommand",
        message: `Unknown Command ${commandInfo.id}`
    };
}

export default { registerCommand, executeCommand };
