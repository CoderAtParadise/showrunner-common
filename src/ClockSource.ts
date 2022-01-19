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

/**
 * @param owner - The owner of the ClockSource
 * @param id - The unique id
 * @param displayName - Readable Name
 * @param state - The State currently in
 * @param overrun - If in overrun state
 * @param automation - If automation is allowed
 * @param current - A Callback to retrieve the current time of the clock
 * @param data - A Callback to retrive any addition data of the clock
 * @param start - A Callback to start the clock
 * @param pause - A Callback to pause the clock
 * @param stop - A Callback to stop the clock
 * @param reset - A Callback to reset the clock
 */
export interface ClockSource {
    readonly owner: string;
    readonly show: string;
    readonly id: string;
    readonly type: string;
    displayName: string;
    state: ClockState;
    overrun: boolean;
    automation: boolean;
    current: () => SMPTE;
    data: () => object | undefined;
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
export interface MutableClockSource extends ClockSource {
    setData: (data: any) => void;
}
