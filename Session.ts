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
      index:number;
    } = {
      tracking: value.tracking,
      start: [],
      save_tracking: value.save,
      display: value.display,
      disabled: value.disabled || false,
      timer: TJSON.serialize(value.timer),
      brackets: [],
      index: -1,
    };
    value.start.forEach((value: Point) => obj.start.push(stringify(value)));
    value.nested.forEach((svalue: Storage) =>{
      let json = BJSON.serialize(svalue as BracketStorage);
      (json as {index: number}).index = (value as unknown as Nested).index.indexOf(value.tracking);
      obj.brackets.push(json);
    });
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
      index: number;
    };
    const start: Point[] = [];
    const brackets: Map<string,BracketStorage> = new Map<string,BracketStorage>();
    const index: string[] = [];
    value.brackets.forEach((json: object) =>
    {
      let bracket = BJSON.deserialize(json);
      index[(json as {index: number}).index] = bracket.tracking;
      brackets.set(bracket.tracking,bracket);
    });
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
      index: index,
    };
  },
};
