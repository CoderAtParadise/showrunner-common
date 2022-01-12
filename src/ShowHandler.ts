import { ClockSource } from "./ClockSource";
import { IProperty } from "./IProperty";
import { Storage } from "./Storage";

export interface ClockIdentifier {
    clock: ClockSource;
    active: boolean;
    render: string[];
}

export interface ShowHandler {
    readonly id: string;
    listClocks: () => ClockIdentifier[];
    getClock: (id: string) => ClockSource | undefined;
    enableClock: (id: string) => boolean;
    disableClock: (id: string) => boolean;
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
}
