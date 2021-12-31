import { SMPTE } from "./SMPTE";

export enum Behaviour {
    STOP = "stop",
    HIDE = "hide",
    OVERRUN = "overrun",
}

export enum Direction {
    COUNTDOWN = "countdown",
    COUNTUP = "countup"
}

export interface TimerSettings {
    direction: Direction;
    behaviour: Behaviour;
    duration: SMPTE;
}

export default { Behaviour, Direction };
