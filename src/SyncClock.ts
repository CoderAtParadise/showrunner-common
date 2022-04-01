import { ClockSource, ClockState } from "./ClockSource";
import { SMPTE } from "./SMPTE";

export const FallbackSyncClockSource: ClockSource<{}> = {
    type: "sync",
    session: "system",
    owner: "system",
    id: "fallback",
    settings: {
        displayName: "Sync Clock"
    },
    state: ClockState.RUNNING,
    overrun: false,
    automation: false,
    current(): SMPTE {
        return new SMPTE(new Date());
    },
    duration(): SMPTE {
        return new SMPTE();
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

let syncClock: ClockSource<any> = FallbackSyncClockSource;

export const getSyncClock = (): ClockSource<any> => {
    return syncClock;
};

export const setSyncClock = (clock: ClockSource<any>): void => {
    syncClock = clock;
};

export default { FallbackSyncClockSource, getSyncClock, setSyncClock };
