import IJson from "./IJson";
import Tracker, { buildTracker, JSON as TJSON } from "./Tracker";
import Show from "./Show";

export interface TrackingShow {
  id: string;
  trackers: Map<string, Tracker>;
  active: string;
  next: string;
}

export function buildTrackingShow(show: Show): TrackingShow {
    const trackers: Map<string, Tracker> = new Map<string, Tracker>();
    show.tracking_list.forEach((v: string) => {
      trackers.set(v, buildTracker(v));
    });
    return { id: show.id, trackers: trackers, active: "", next: "" };
  }

export const JSON: IJson<TrackingShow> = {
  serialize: (value: TrackingShow): object => {
    const trackers: object[] = [];
    value.trackers.forEach((value: Tracker) => {
      trackers.push(TJSON.serialize(value));
    });
    return {
      id: value.id,
      trackers: trackers,
      active: value.active,
      next: value.next,
    };
  },
  deserialize: (json: any): TrackingShow => {
    const trackers: Map<string, Tracker> = new Map<string, Tracker>();
    (json.trackers as object[]).forEach((value: any) => {
      const v = TJSON.deserialize(value);
      trackers.set(v.id, v);
    });
    return {
      id: json.id,
      trackers: trackers,
      active: json.active,
      next: json.next,
    };
  },
};

export default TrackingShow;