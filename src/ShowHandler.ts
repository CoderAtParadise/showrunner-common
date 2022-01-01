import { ClockSource } from "./ClockSource";

export interface ShowHandler {
    readonly id: string;
    getClock: (id: string) => ClockSource | undefined;
    enableClock: (id: string) => boolean;
    disableClock: (id: string) => boolean;
    isRegisteredClock: (id: string) => boolean;
    tickClocks: () => void;
}
