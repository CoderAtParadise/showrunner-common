export enum Relative {
  NONE = "",
  START = "+",
  END = "-",
}

export interface Point {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly relative: Relative;
}

export interface RelativePoint extends Point {}

export const INVALID: Point = {
  hours: -1,
  minutes: -1,
  seconds: -1,
  relative: Relative.NONE,
};

export function now(): Point {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    relative: Relative.NONE,
  };
}

export function copy(point: Point): Point {
  return {
    hours: point.hours,
    minutes: point.minutes,
    seconds: point.seconds,
    relative: point.relative,
  };
}

export function equals(lhs: Point, rhs: Point): boolean {
  return (
    lhs.hours === rhs.hours &&
    lhs.minutes === rhs.minutes &&
    lhs.seconds === rhs.seconds
  );
}

export function greaterThan(lhs: Point, rhs: Point): boolean {
  if (lhs === INVALID || rhs === INVALID) return false;
  if (lhs.hours > rhs.hours) return true;
  if (lhs.hours === rhs.hours) {
    if (lhs.minutes > rhs.minutes) return true;
    if (lhs.minutes === rhs.minutes) if (lhs.seconds > rhs.seconds) return true;
  }
  return false;
}

export function add(lhs: Point, rhs: Point): Point {
  if (lhs === INVALID || rhs === INVALID) return INVALID;
  const tis = (lhs.hours * 60 + lhs.minutes) * 60 + lhs.seconds;
  const otis = (rhs.hours * 60 + rhs.minutes) * 60 + rhs.seconds;
  let res = Math.abs(tis + otis);
  const seconds = res % 60;
  res = Math.floor(res / 60);
  const minutes = res % 60;
  const hours = Math.floor(res / 60);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    relative: Relative.NONE,
  };
}

export const subtract = (lhs: Point, rhs: Point): Point => {
  if (lhs === INVALID || rhs === INVALID) return INVALID;
  const tis = (lhs.hours * 60 + lhs.minutes) * 60 + lhs.seconds;
  const otis = (rhs.hours * 60 + rhs.minutes) * 60 + rhs.seconds;
  let res = Math.abs(tis - otis);
  const seconds = res % 60;
  res = Math.floor(res / 60);
  const minutes = res % 60;
  const hours = Math.floor(res / 60);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    relative: Relative.NONE,
  };
};

export function stringify(point: Point): string {
  const zeroPad = (num: number, places: number): string => {
    return String(num).padStart(places, "0");
  };
  if (equals(point, INVALID)) return "--:--:--";
  return `${point.relative}${zeroPad(point.hours, 2)}:${zeroPad(
    point.minutes,
    2
  )}:${zeroPad(point.seconds, 2)}`;
}

export function parse(str: string): Point | RelativePoint {
  if (str === "--:--:--") return INVALID;
  let relative: Relative;
  if (str.charAt(0) === Relative.START || str.charAt(0) === Relative.END) {
    relative = str.charAt(0) as Relative;
    str = str.slice(0);
  } else relative = Relative.NONE;
  const values: string[] = str.split(":");
  return {
    hours: Number.parseInt(values[0]),
    minutes: Number.parseInt(values[1]),
    seconds: Number.parseInt(values[2]),
    relative: relative,
  };
}
