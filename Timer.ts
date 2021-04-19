import IJson from "./IJson"
import {Point,stringify, parse,greaterThan,subtract,equals, now} from "./Time"

export enum Behaviour
{
    STOP = "stop",
    HIDE =  "hide",
    OVERRUN = "overrun",
}

export enum Display 
{
    COUNTDOWN = "countdown",
    ELAPSED = "elapsed",
}

export interface Settings
{
    duration : Point;
    behaviour : Behaviour;
    display : Display;
    show : boolean;
}

export interface Tracking
{
    start: Point;
    end: Point;
    show: boolean;
    overrun?: boolean;
}

export function current(tracking:Tracking) : Point {
    if(greaterThan(now(),tracking.end))
    {
        tracking.overrun = true;
        return subtract(now(),tracking.start);
    }
    return subtract(tracking.end,now());
}

export function isAt(tracking:Tracking, time:Point) : boolean {
    return equals(current(tracking),time);
}

export const JSON : IJson<Settings> = {
    serialize(value: Settings): object {
        return {display: value.display as string, Behaviour: value.behaviour as string, duration: stringify(value.duration),show: value.show};
    },

    deserialize(json:object): Settings {
        const value = json as
            {
                display: string;
                behaviour: string;
                duration: string;
                show: boolean;
            };
        return {
            display: value.display as Display,
            behaviour: value.behaviour as Behaviour,
            duration: parse(value.duration),
            show: value.show
        };
    },
}