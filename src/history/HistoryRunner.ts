import { CommandReturn } from "../ICommand";
import { History } from "./History";

export interface HistoryRunner {
    apply: (ex: History) => CommandReturn;
    revertTo: (ex: History) => CommandReturn;
}

const historyRunners: Map<string, HistoryRunner> = new Map<
    string,
    HistoryRunner
>();

export function registerRunner(id: string, runner: HistoryRunner) {
    historyRunners.set(id, runner);
}

export default { registerRunner };
