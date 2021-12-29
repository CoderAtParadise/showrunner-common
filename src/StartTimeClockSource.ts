import { MutableClockSource } from "./ClockSource";
import { SMPTE } from "./SMPTE";
import { getSyncClock } from "./SyncClock";

export class StartTimeClockSource implements MutableClockSource {
    constructor(id: string, startTime: SMPTE) {
        this.id = id;
        this.startTime = startTime;
    }

    clock(): SMPTE {
        return new SMPTE(
            getSyncClock().clock().valueOf() - this.startTime.valueOf()
        );
    }

    data(): object | undefined {
        return { startTime: this.startTime };
    }

    setData(data: any): void {
        if (data instanceof SMPTE) this.startTime = data;
        if (data?.startTime as SMPTE) this.startTime = data.startTime;
    }

    id: string;
    private startTime: SMPTE;
}
