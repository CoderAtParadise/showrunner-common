import IJson from "./IJson";
import { Timer, TIMER_JSON } from "./Timer";

export interface Tracker {
  id: string;
  timer: Timer;
}

export interface TrackingShow {
  id: string;
  trackers: Map<string, Tracker>;
  active: string;
  next: string;
}

export const TRACKER_JSON: IJson<Tracker> = {
  serialize: (value: Tracker): object => {
    return { id: value.id, timer: TIMER_JSON.serialize(value.timer) };
  },
  deserialize: (json: any): Tracker => {
    return { id: json.id, timer: TIMER_JSON.deserialize(json.timer) };
  },
};

export const TRACKINGSHOW_JSON: IJson<TrackingShow> = {
    serialize: (value:TrackingShow): object => {
        const trackers: object[] = [];
        value.trackers.forEach((value:Tracker) => {
            trackers.push(TRACKER_JSON.serialize(value));
        });
        return {id:value.id,trackers:trackers,active: value.active,next:value.next};
    },
    deserialize: (json:any): TrackingShow => {
        const trackers: Map<string,Tracker> = new Map<string,Tracker>();
        (json.trackers as object[]).forEach((value:any) => {
            const v = TRACKER_JSON.deserialize(value);
            trackers.set(v.id,v);
        });
        return {id: json.id,trackers:trackers,active: json.active, next: json.next};
    }
}
