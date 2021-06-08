import { TimePoint } from "./TimePoint";

export interface ClockSource {
    id: string;
    clock: () => TimePoint;
}

export default ClockSource;