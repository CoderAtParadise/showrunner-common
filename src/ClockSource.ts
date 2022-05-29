import { SMPTE } from "./SMPTE";

export enum ClockState {
    RESET = "reset",
    STOPPED = "stopped",
    PAUSED = "paused",
    RUNNING = "running"
}

export enum ClockDirection {
    COUNTDOWN = "countdown",
    COUNTUP = "countup"
}

export interface BaseClockSettings {
    displayName: string;
    automation: boolean;
}

export interface ClockIdentifier {
    id:string;
    owner:string;
    show:string;
    session:string;
}

/**
 * @param identifier - The unique id
 * @param type - The ClockSource type
 * @param settings - Configurable settings
 * @param state - The State currently in
 * @param overrun - If in overrun state
 * @param current - A Callback to retrieve the current time of the clock
 * @param data - A Callback to retrive any addition data of the clock
 * @param start - A Callback to start the clock
 * @param pause - A Callback to pause the clock
 * @param stop - A Callback to stop the clock
 * @param reset - A Callback to reset the clock
 */
export interface ClockSource<Settings> {
    readonly identifier: ClockIdentifier;
    readonly type: string;
    settings: BaseClockSettings & Settings;
    state: ClockState;
    overrun: boolean;
    incorrectFramerate: boolean;
    displayName?: () => string;
    current: () => SMPTE;
    duration: () => SMPTE;
    data?: () => object;
    start: () => void;
    pause: (override: boolean) => void;
    stop: (override: boolean) => void;
    reset: (override: boolean) => void;
    update: () => void;
}

/**
 * {@inheritDoc ClockSource}
 * @param setData - A Callback to assign any additional data of the clock
 */
export interface MutableClockSource<Settings> extends ClockSource<Settings> {
    setData: (data: any) => void;
}
