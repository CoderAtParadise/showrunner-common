import { Point } from "./Time";

export interface ClockSource {
    id: string;
    clock: () => Point;
}

export default ClockSource;