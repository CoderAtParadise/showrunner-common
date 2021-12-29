import { ClockSource } from "./ClockSource";
import { SMPTE } from "./SMPTE";

export const FallbackSyncClockSource: ClockSource = {
    id: "server_fallback",
    clock(): SMPTE {
        return new SMPTE(new Date());
    },
    data(): object | undefined {
        return undefined;
    }
};

let syncClock: ClockSource = FallbackSyncClockSource;

export const getSyncClock = (): ClockSource => {
    return syncClock;
};

export const setSyncClock = (clock: ClockSource): void => {
    syncClock = clock;
};

export default { syncClock, getSyncClock, setSyncClock };
