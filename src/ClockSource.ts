import { SMPTE } from "./SMPTE";

export enum ClockState {
    STOPPED = "stopped",
    HIDDEN = "hidden",
    PAUSED = "paused",
    RUNNING = "running",
    OVERRUN = "overrun"
}

/**
 * @param id - The unique id
 * @param display - Readable Name
 * @param state - The State currently in
 * @param current - A Callback to retrieve the current time of the clock
 * @param data - A Callback to retrive any addition data of the clock
 * @param start - A Callback to start the clock
 * @param pause - A Callback to pause the clock
 * @param stop - A Callback to stop the clock
 * @param reset - A Callback to reset the clock
 */
export interface ClockSource {
    readonly id: string;
    display: string;
    state: ClockState;
    current: () => SMPTE;
    data: () => object | undefined;
    start: () => void;
    pause: () => void;
    stop: () => void;
    reset: () => void;
    update: () => void;
}

/**
 * {@inheritDoc ClockSource}
 * @param setData - A Callback to assign any additional data of the clock
 */
export interface MutableClockSource extends ClockSource {
    setData: (data: any) => void;
}
