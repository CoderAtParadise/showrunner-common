import IJson from "./IJson";
import { Nested, Storage, Type } from "./Storage";
import { BracketStorage, JSON as BJSON } from "./Bracket";
import { JSON as TJSON } from "./Timer";
import { Point, stringify, parse } from "./Time";

export interface SessionData {
  start: Point[];
  save: boolean;
}

export interface SessionStorage extends Storage, Nested, SessionData {}

export const JSON: IJson<SessionStorage> = {
  serialize(value: SessionStorage): object {
    const obj: {
      tracking: string;
      start: string[];
      save_tracking: boolean;
      display: string;
      disabled: boolean;
      timer: {};
      brackets: object[];
    } = {
      tracking: value.tracking,
      start: [],
      save_tracking: value.save,
      display: value.display,
      disabled: value.disabled || false,
      timer: TJSON.serialize(value.timer),
      brackets: [],
    };
    value.start.forEach((value: Point) => obj.start.push(stringify(value)));
    value.nested.forEach((value: Storage) =>
      obj.brackets.push(BJSON.serialize(value as BracketStorage))
    );
    return obj;
  },

  deserialize(json: object): SessionStorage {
    const value = json as {
      tracking: string;
      start: string[];
      save_tracking: boolean;
      display: string;
      disabled: boolean;
      timer: {};
      brackets: object[];
    };
    const start: Point[] = [];
    const brackets: Storage[] = [];
    value.brackets.forEach((json: object) =>
      brackets.push(BJSON.deserialize(json))
    );
    value.start.forEach((json: string) => start.push(parse(json)));
    return {
      tracking: value.tracking,
      start: start,
      save: value.save_tracking,
      type: Type.SESSION,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      nestedType: Type.BRACKET,
      nested: brackets,
    };
  },
};
