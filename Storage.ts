import { Settings,Behaviour,Display } from "./Timer";
import {INVALID as INVALID_POINT} from "./Time";

export enum Type {
  INVALID = "invalid",
  SESSION = "session",
  BRACKET = "bracket",
  ITEM = "item",
}

export interface Storage {
  tracking: string;
  type: Type;
  display: string;
  disabled: boolean;
  timer: Settings;
}

export const INVALID: Storage =
{
  tracking: "",
  type: Type.SESSION,
  display: "Invalid",
  disabled: true,
  timer: {
    duration : INVALID_POINT,
    behaviour : Behaviour.HIDE,
    display : Display.ELAPSED,
    show : false,
  }
}

export interface Nested {
  nestedType: Type;
  nested: Map<string, Storage>;
  index: string[];
}

function canStore(list: Nested, value: Storage): boolean {
  return list.nestedType === value.type;
}

export function add(
  list: Nested,
  value: Storage,
  index: number = list.index.length
): boolean {
  if (canStore(list, value)) {
    list.nested.set(value.tracking, value);
    list.index.splice(index, 0, value.tracking);
    return true;
  }
  return false;
}

export function remove(list: Nested, id: string): boolean {
  list.index.splice(list.index.indexOf(id), 1);
  return list.nested.delete(id);
}

export function get(list: Nested, sid: string): Storage {
  return list.nested.get(sid) || INVALID;
}

export function move(
  source: Nested,
  sid: string,
  target: Nested,
  tindex: number
): boolean {
  const value = get(source, sid);
  if (value && canStore(target, value)) {
    if (!target.nested.has(sid)) {
      add(target, value, tindex);
      return remove(source, sid);
    } else {
      target.index.splice(tindex, 0, target.index.splice(source.index.indexOf(sid), 1)[0]); //simple way to do if source == target
      return true;
    }
  }
  return false;
}
