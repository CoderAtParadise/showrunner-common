import { Timer } from "./Timer";

export interface Tracker {
    id: string;
    timer: Timer;
}

export interface TrackingShow {
    id: string;
    trackers: Map<string,Tracker>;
}