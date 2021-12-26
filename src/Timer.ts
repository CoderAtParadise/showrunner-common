import IJson from "./IJson";
import { SMPTE, INVALID as INVALID_SMPTE } from "./SMPTE";

export enum Behaviour {
  STOP = "stop",
  HIDE = "hide",
  OVERRUN = "overrun",
  LOOP = "loop"
}

export enum Type {
  COUNTDOWN = "countdown",
  ELAPSED = "elapsed",
}

export interface Settings {
  duration: SMPTE;
  source: string;
  behaviour: Behaviour;
  type: Type;
}

export enum TimerState {
  RUNNING = "running",
  OVERRUN = "overrun",
  STOPPED = "stopped",
  HIDDEN = "hidden",
}

export interface Timer {
  start: SMPTE;
  end: SMPTE;
  state: TimerState;
}

export const INVALID_SETTINGS : Settings = {
  type: Type.COUNTDOWN,
  source: "invalid",
  behaviour: Behaviour.HIDE,
  duration: INVALID_SMPTE,
}

export const TIMER_JSON: IJson<Timer> = {
  serialize(value: Timer): object {
    return {
      start: value.start.toString(),
      end: value.end.toString(),
      state: value.state as TimerState,
    };
  },
  deserialize(json: object): Timer {
    const value = json as {
      start: string;
      end: string;
      state: string;
    };
    return {
      start: new SMPTE(value.start),
      end: new SMPTE(value.end),
      state: value.state as TimerState,
    };
  },
};

export const SETTINGS_JSON: IJson<Settings> = {
  serialize(value: Settings): object {
    return {
      type: value.type as string,
      behaviour: value.behaviour as string,
      source: value.source,
      duration: value.duration.toString(),
    };
  },
  deserialize(json: object): Settings {
    const value = json as {
      type: string;
      source: string;
      behaviour: string;
      duration: string;
    };
    return {
      type: value.type as Type,
      source: value.source,
      behaviour: value.behaviour as Behaviour,
      duration: new SMPTE(value.duration),
    };
  }
};

export default Timer;