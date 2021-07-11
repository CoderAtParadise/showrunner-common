import IJson from "./IJson";
import { TimePoint, stringify, parse, INVALID as INVALID_POINT } from "./TimePoint";

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
  duration: TimePoint;
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
  start: TimePoint;
  end: TimePoint;
  state: TimerState;
}

export const INVALID_SETTINGS : Settings = {
  type: Type.COUNTDOWN,
  source: "invalid",
  behaviour: Behaviour.HIDE,
  duration: INVALID_POINT,
}

export const TIMER_JSON: IJson<Timer> = {
  serialize(value: Timer): object {
    return {
      start: stringify(value.start),
      end: stringify(value.end),
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
      start: parse(value.start),
      end: parse(value.end),
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
      duration: stringify(value.duration),
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
      duration: parse(value.duration),
    };
  },
};

export default Timer;