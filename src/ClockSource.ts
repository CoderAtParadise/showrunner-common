import { SMPTE } from "./SMPTE";
/**
 * @param id - The unique id
 * @param clock - A Callback to retrieve the current time of the clock
 */
export interface ClockSource {
    id: string;
    clock: () => SMPTE;
    data: () => object | undefined;
}

export interface MutableClockSource extends ClockSource {
    setData: (data: any) => void;
}

export default ClockSource;
