export enum Offset {
  NONE = "",
  START = "+",
  END = "-",
}

export interface TimePoint {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly offset: Offset;
}

export interface ModifiablePoint extends TimePoint {
  hours: number;
  minutes: number;
  seconds: number;
  offset: Offset;
}

export const INVALID: TimePoint = {
  hours: -1,
  minutes: -1,
  seconds: -1,
  offset: Offset.NONE,
};

export function copy(point: TimePoint): TimePoint {
  return {
    hours: point.hours,
    minutes: point.minutes,
    seconds: point.seconds,
    offset: point.offset,
  };
}

export function equals(lhs: TimePoint, rhs: TimePoint): boolean {
  return (
    lhs.hours === rhs.hours &&
    lhs.minutes === rhs.minutes &&
    lhs.seconds === rhs.seconds
  );
}

export function greaterThan(lhs: TimePoint, rhs: TimePoint): boolean {
  if (lhs === INVALID || rhs === INVALID) return false;
  if (lhs.hours > rhs.hours) return true;
  if (lhs.hours === rhs.hours) {
    if (lhs.minutes > rhs.minutes) return true;
    if (lhs.minutes === rhs.minutes) if (lhs.seconds > rhs.seconds) return true;
  }
  return false;
}

export function add(lhs: TimePoint, rhs: TimePoint): TimePoint {
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
    offset: Offset.NONE,
  };
}

export const subtract = (lhs: TimePoint, rhs: TimePoint): TimePoint => {
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
    offset: Offset.NONE,
  };
};

export function stringify(point: TimePoint): string {
  const zeroPad = (num: number, places: number): string => {
    return String(num).padStart(places, "0");
  };
  if (equals(point, INVALID)) return "--:--:--";
  return `${point.offset}${zeroPad(point.hours, 2)}:${zeroPad(
    point.minutes,
    2
  )}:${zeroPad(point.seconds, 2)}`;
}

export function parse(str: string): TimePoint {
  if (str === "--:--:--") return INVALID;
  let offset: Offset;
  if (str.charAt(0) === Offset.START || str.charAt(0) === Offset.END) {
    offset = str.charAt(0) as Offset;
    str = str.slice(0);
  } else offset = Offset.NONE;
  const values: string[] = str.split(":");
  return {
    hours: Number.parseInt(values[0]),
    minutes: Number.parseInt(values[1]),
    seconds: Number.parseInt(values[2]),
    offset: offset,
  };
}

export default TimePoint;