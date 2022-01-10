import { ClockSource, ClockState } from "./ClockSource";
import { SMPTE } from "./SMPTE";

export const FallbackSyncClockSource: ClockSource = {
    type: "sync",
    owner: "system",
    id: "fallback",
    display: "Sync Clock",
    state: ClockState.RUNNING,
    current(): SMPTE {
        return new SMPTE(new Date());
    },
    data(): object | undefined {
        return undefined;
    },
    start(): void {
        // NOOP
    },
    pause(): void {
        // NOOP
    },
    stop(): void {
        // NOOP
    },
    reset(): void {
        // NOOP
    },
    update(): void {
        // NOOP
    }
};

let syncClock: ClockSource = FallbackSyncClockSource;

export const getSyncClock = (): ClockSource => {
    return syncClock;
};

export const setSyncClock = (clock: ClockSource): void => {
    syncClock = clock;
};

export default { FallbackSyncClockSource, getSyncClock, setSyncClock };
