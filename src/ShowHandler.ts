import { History } from "./history/History";

export interface ShowHandler {
    readonly id: string;
    displayName: string;
    tick: () => void;
    history: () => History[];
    writeHistory: (history: History) => boolean;
    undoHistory: (id?: string) => boolean;
    markDirty: (dirty: boolean) => void;
    isDirty: () => boolean;
    get: (key: string) => any[];
    getValue: (key: string, id: string) => any;
    setValue: (key: string, value: any) => void;
}
