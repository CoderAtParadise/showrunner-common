import { Settings, Timer, JSON as SJSON } from "./Timer";
import {
  INVALID as INVALID_POINT,
  add,
  now,
  stringify,
  parse,
  Point,
} from "./Time";
import IJson from "./IJson";
import { Nested, Storage } from "./Storage";
import {SessionStorage} from "./Session";

export interface TrackingSession {
  session_id: string;
  tracking_id: string;
  trackers: Map<string, Tracker>;
  settings: Settings;
  startTime: Point;
  timer: Timer;
}

export interface Tracker {
  tracking_id: string;
  parent: string;
  settings: Settings;
  timers: Timer[];
  index: number;
}

function buildTracking(parent: string, storage: Storage): Tracker {
  return {
    tracking_id: storage.tracking,
    parent: parent,
    settings: storage.timer,
    timers: [],
    index: -1,
  };
}

export function buildTrackingSession(session_info: {session_id:string,time:Point},storage:SessionStorage)
{
  const session: TrackingSession = {
    tracking_id: storage.tracking,
    session_id: session_info.session_id,
    trackers: new Map<string,Tracker>(),
    startTime: session_info.time,
    settings: storage.timer,
    timer: {
      start: INVALID_POINT,
      end: INVALID_POINT,
      show: storage.timer.show,
      overrun: false
    }
  }
  storage.nested.forEach((value:Storage) => {
    const bracket = buildTracking(storage.tracking,value);
    session.trackers.set(bracket.tracking_id,bracket);
    (value as unknown as Nested).nested.forEach((ivalue:Storage) => {
        const item = buildTracking(bracket.tracking_id,ivalue);
        session.trackers.set(item.tracking_id,item);
    });
  });
  return session;
}

export function start(tracker: Tracker): void {
  tracker.index++;
  if (tracker.index >= tracker.timers.length)
    tracker.timers.push({
      start: INVALID_POINT,
      end: INVALID_POINT,
      show: tracker.settings.show,
      overrun: false
    });
  const timer: Timer = tracker.timers[tracker.index];
  timer.start = now();
  timer.end = add(now(), tracker.settings.duration);
}

export function end(tracker: Tracker): void {
  tracker.timers[tracker.index].end = now();
}

export const SESSION_JSON: IJson<TrackingSession> = {
  serialize(value: TrackingSession): object {
    const obj: {
      tracking_id: string;
      session_id: string;
      trackers: object[];
      settings: object;
      timer: { start: string; end: string; overrun: boolean; show: boolean };
      startTime: string;
    } = {
      tracking_id: value.tracking_id,
      session_id: value.session_id,
      trackers: [],
      settings: SJSON.serialize(value.settings),
      timer: {
        start: stringify(value.timer.start),
        end: stringify(value.timer.end),
        overrun: value.timer.overrun,
        show: value.timer.show,
      },
      startTime: stringify(value.startTime),
    };
    value.trackers.forEach((value: Tracker) =>
      obj.trackers.push(TRACKER_JSON.serialize(value))
    );
    return obj;
  },
  deserialize(json: object): TrackingSession {
    const value = json as {
      tracking_id: string;
      session_id: string;
      settings: object;
      trackers: object[];
      timer: { start: string; end: string; overrun: boolean; show: boolean };
      startTime: string;
    };
    const trackers: Map<string, Tracker> = new Map<string, Tracker>();
    value.trackers.forEach((value: object) => {
      const tracker = TRACKER_JSON.deserialize(value);
      trackers.set(tracker.tracking_id, tracker);
    });
    return {
      tracking_id: value.tracking_id,
      session_id: value.session_id,
      trackers: trackers,
      settings: SJSON.deserialize(value.settings),
      timer: {
        start: parse(value.timer.start),
        end: parse(value.timer.end),
        overrun: value.timer.overrun,
        show: value.timer.show,
      },
      startTime: parse(value.startTime),
    };
  },
};

export const TRACKER_JSON: IJson<Tracker> = {
  serialize(value: Tracker): object {
    const obj: {
      tracking_id: string;
      parent: string;
      settings: object;
      timers: { start: string; end: string; show: boolean; overrun: boolean; }[];
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
        overrun: value.overrun,
      })
    );
    return obj;
  },
  deserialize(json: object): Tracker {
    const value = json as {
      tracking_id: string;
      parent: string;
      settings: object;
      timers: { start: string; end: string; show: boolean; overrun: boolean; }[];
      index: number;
    };
    const timers: Timer[] = [];
    value.timers.forEach(
      (value: { start: string; end: string; show: boolean; overrun: boolean; }) =>
        timers.push({
          start: parse(value.start),
          end: parse(value.end),
          show: value.show,
          overrun: value.overrun,
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
