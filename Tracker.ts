import IJson from "./IJson";
import { Timer, TimerState, TIMER_JSON } from "./Timer";
import { INVALID } from "./TimePoint";

export interface Tracker {
  id: string;
  timer: Timer;
}

export function buildTracker(id: string): Tracker {
  return {
    id: id,
    timer: {
      start: INVALID,
      end: INVALID,
      state: TimerState.STOPPED,
    },
  };
}

export const JSON: IJson<Tracker> = {
  serialize: (value: Tracker): object => {
    return { id: value.id, timer: TIMER_JSON.serialize(value.timer) };
  },
  deserialize: (json: any): Tracker => {
    return { id: json.id, timer: TIMER_JSON.deserialize(json.timer) };
  },
};

export default Tracker;
