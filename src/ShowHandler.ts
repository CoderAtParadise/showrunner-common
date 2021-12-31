import { ClockSource } from "./ClockSource";

export interface ShowHandler {
    id: string;
    getClock: (id: string) => ClockSource;
    enableClock: (id:string) => boolean;
    disableClock: (id: string) => void;
}
