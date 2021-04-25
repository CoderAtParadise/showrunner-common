import { Settings, Timer, JSON as SJSON } from "./Timer";
import { INVALID as INVALID_POINT, add, now, stringify, parse } from "./Time";
import IJson from "./IJson";
import { Storage } from "./Storage";

export interface Tracker {
  tracking_id: string;
  parent: string;
  settings: Settings;
  timers: Timer[];
  index: number;
}

export function buildTracking(parent:string,storage: Storage): Tracker {
  return {
    tracking_id: storage.tracking,
    parent:parent,
    settings: storage.timer,
    timers: [],
    index: -1,
  };
}

export function start(tracker: Tracker): void {
  tracker.index++;
  if (tracker.index >= tracker.timers.length)
    tracker.timers.push({
      start: INVALID_POINT,
      end: INVALID_POINT,
      show: tracker.settings.show,
    });
  const timer: Timer = tracker.timers[tracker.index];
  timer.start = now();
  timer.end = add(now(), tracker.settings.duration);
}

export function end(tracker: Tracker, location: Location): void {
  tracker.timers[tracker.index].end = now();
}

export const JSON: IJson<Map<string, Tracker>> = {
  serialize(value: Map<string, Tracker>): object {
    const obj: object[] = [];
    value.forEach((value: Tracker) => obj.push(TRACKER_JSON.serialize(value)));
    return obj;
  },
  deserialize(json: object): Map<string, Tracker> {
    const tracker_list: Map<string, Tracker> = new Map<string, Tracker>();
    const value = json as object[];
    value.forEach((value: object) => {
      const tracker = TRACKER_JSON.deserialize(value);
      tracker_list.set(tracker.tracking_id, tracker);
    });
    return tracker_list;
  },
};

const TRACKER_JSON: IJson<Tracker> = {
  serialize(value: Tracker): object {
    const obj: {
      tracking_id: string;
      parent: string;
      settings: object;
      timers: { start: string; end: string; show: boolean }[];
      index: number;
    } = {
      tracking_id: value.tracking_id,
      parent: value.parent,
      settings: SJSON.serialize(value.settings),
      timers: [],
      index: value.index,
    };
    value.timers.forEach((value: Timer) =>
      obj.timers.push({
        start: stringify(value.start),
        end: stringify(value.end),
        show: value.show,
      })
    );
    return obj;
  },
  deserialize(json: object): Tracker {
    const value = json as {
      tracking_id: string;
      parent: string;
      settings: object;
      timers: { start: string; end: string; show: boolean }[];
      index: number;
    };
    const timers: Timer[] = [];
    value.timers.forEach(
      (value: { start: string; end: string; show: boolean }) =>
        timers.push({
          start: parse(value.start),
          end: parse(value.end),
          show: value.show,
        })
    );
    return {
      tracking_id: value.tracking_id,
      parent: value.parent,
      settings: SJSON.deserialize(value.settings),
      timers: timers,
      index: value.index,
    };
  },
};
