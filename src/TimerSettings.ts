import { SMPTE } from "./SMPTE";

export enum Behaviour {
    STOP = "stop",
    HIDE = "hide",
    OVERRUN = "overrun",
    LOOP = "loop"
}

export enum Type {
    COUNTDOWN = "countdown",
    ELAPSED = "elapsed"
}

export interface TimerSettings {
    authority: string;
    type: Type;
    behaviour: Behaviour;
    duration: SMPTE;
}

export default { Behaviour, Type };
