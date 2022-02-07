import { ClockSource } from "./ClockSource";
import { IProperty } from "./IProperty";
import { ClockIdentifier, RenderChannel } from "./ClockIdentifier";
import { Storage } from "./Storage";
import { History } from "./History";

export interface ClockOptions {
    active?: boolean;
    configurable?: boolean;
    renderChannel?: RenderChannel[];
}

export interface ShowHandler {
    readonly id: string;
    readonly location: string;
    displayName: string;
    dirty: boolean;
    listClocks: () => ClockIdentifier[];
    getClock: (id: string) => ClockSource | undefined;
    enableClock: (id: string) => boolean;
    disableClock: (id: string) => boolean;
    registerClock: (clock: ClockSource, options: ClockOptions) => boolean;
    isRegisteredClock: (id: string) => boolean;
    tickClocks: () => void;
    getStorage: (id: string) => Storage<any> | undefined;
    hasOverrideProperty: (id: string, key: string) => boolean;
    getOverrideProperty: (
        id: string,
        key: string
    ) => IProperty<any> | undefined;
    setOverrideProperty: (property: IProperty<any>) => void;
    removeOverrideProperty: (id: string, key: string) => void;
    history: () => History[];
    writeHistory: (history: History) => boolean;
    undoHistory: (id?: string) => boolean;
    markDirty: (dirty: boolean) => void;
}
