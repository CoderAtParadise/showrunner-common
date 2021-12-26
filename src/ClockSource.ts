import SMPTE from "./SMPTE";

export interface ClockSource {
    id: string;
    clock: () => SMPTE;
}

export default ClockSource;
