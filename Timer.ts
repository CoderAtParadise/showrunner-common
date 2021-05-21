import IJson from "./IJson";
import { Point, stringify, parse } from "./Time";

export enum Behaviour {
  STOP = "stop",
  HIDE = "hide",
  OVERRUN = "overrun",
}

export enum Type {
  COUNTDOWN = "countdown",
  ELAPSED = "elapsed",
}

export interface Settings {
  duration: Point;
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
  start: Point;
  end: Point;
  state: TimerState;
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

export const JSON: IJson<Settings> = {
  serialize(value: Settings): object {
    return {
      display: value.display as string,
      behaviour: value.behaviour as string,
      source: value.source,
      duration: stringify(value.duration),
    };
  },

  deserialize(json: object): Settings {
    const value = json as {
      display: string;
      source: string;
      behaviour: string;
      duration: string;
    };
    return {
      display: value.display as Display,
      source: value.source,
      behaviour: value.behaviour as Behaviour,
      duration: parse(value.duration),
    };
  },
};
