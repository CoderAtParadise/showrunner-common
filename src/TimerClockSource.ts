import { MutableClockSource } from "./ClockSource";
import { SMPTE } from "./SMPTE";
import { TimerSettings } from "./TimerSettings";

export enum TimerState {
    RUNNING = "running",
    OVERRUN = "overrun",
    STOPPED = "stopped",
    HIDDEN = "hidden"
}

export class TimerClockSource implements MutableClockSource {
    constructor(id: string, start: SMPTE, settings: TimerSettings) {
        this.id = id;
        this.start = start;
        this.end = new SMPTE(
            this.start.valueOf() - settings.duration.valueOf()
        );
        this.settings = settings;
    }

    clock(): SMPTE {
        return new SMPTE(this.end.valueOf() - this.start.valueOf());
    }

    data(): object | undefined {
        return {
            start: this.start,
            end: this.end,
            state: this.state,
            settings: this.settings
        };
    }

    setData(data: any): void {
        if (data as TimerState) this.state = data;
        if (data?.start as SMPTE) this.start = data.start;
        if (data?.end as SMPTE) this.end = data.end;
        if (data?.state as TimerState) this.state = data.state;
        if (data?.settings as TimerSettings) this.settings = data.settings;
    }

    id: string;
    private start: SMPTE;
    private end: SMPTE;
    private state: TimerState = TimerState.STOPPED;
    private settings: TimerSettings;
}
