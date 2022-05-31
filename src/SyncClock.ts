import { ClockSource, ClockState } from "./ClockSource";
import { SMPTE } from "./SMPTE";

export const FallbackSyncClockSource: ClockSource<{}> = {
    type: "sync",
    identifier: {
        owner: "system",
        id: "fallback",
        show: "system",
        session: "system"
    },
    settings: {
        displayName: "Sync Clock",
        automation: false
    },
    state: ClockState.RUNNING,
    overrun: false,
    incorrectFramerate(): boolean {
        return false;
    },
    current(): SMPTE {
        return new SMPTE(new Date());
    },
    duration(): SMPTE {
        return new SMPTE();
    },
    start(): void {
        // NOOP
    },
    setTime() {
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
