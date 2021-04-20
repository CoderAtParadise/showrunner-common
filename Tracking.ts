import { Timer } from "./Timer";
import { INVALID as INVALID_POINT, add, now, stringify, parse } from "./Time";
import IJson from "./IJson";

export interface Tracker {
  tracking_id: string;
  timers: Timer[];
  index: number;
}

export function start(tracker: Tracker): void {
  tracker.index++;
  if (tracker.index >= tracker.timers.length)
    tracker.timers.push({
      start: INVALID_POINT,
      end: INVALID_POINT,
      show: false,//tracker.tracking.timer.show,
    });
    const timer:Timer = tracker.timers[tracker.index];
    timer.start = now();
    //timer.end = add(now(),tracker.tracking.timer.duration);
}

export function end(tracker:Tracker,location:Location): void {
    tracker.timers[tracker.index].end = now();
}

export const JSON : IJson<Map<string,Tracker>> = {
  serialize(value:Map<string,Tracker>) : object
  {
    const obj: object[] = [];
    value.forEach((value:Tracker) => obj.push(TRACKER_JSON.serialize(value)));
    return obj;
  },
  deserialize(json:object) : Map<string,Tracker>
  {
    const tracker_list: Map<string,Tracker> = new Map<string,Tracker>();
    const value = json as object[];
    value.forEach((value:object) => {
      const tracker = TRACKER_JSON.deserialize(value);
      tracker_list.set(tracker.tracking_id,tracker);
    });
    return tracker_list;
  }
}

const TRACKER_JSON: IJson<Tracker> = {
  serialize(value: Tracker): object {
    const obj: {
      tracking_id: string;
      timers: { start: string; end: string; show: boolean }[];
      index: number;
    } = {
      tracking_id: value.tracking_id,
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
    return {tracking_id:value.tracking_id,timers:timers,index:value.index};
  },
};