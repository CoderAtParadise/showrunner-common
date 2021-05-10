import IJson from "./IJson";
import { Nested, Storage, Type } from "./Storage";
import { BracketStorage, JSON as BJSON } from "./Bracket";
import { JSON as TJSON } from "./Timer";
import { Point, stringify, parse } from "./Time";
import { DirectionStorage,JSON as DJSON } from "./Direction";

export interface SessionData {
  start: {session_id: string, time:Point}[];
  save: boolean;
}

export interface SessionStorage extends Storage, Nested, SessionData {}

export const JSON: IJson<SessionStorage> = {
  serialize(value: SessionStorage): object {
    const obj: {
      tracking: string;
      start: {session_id: string,time:string}[];
      save_tracking: boolean;
      display: string;
      disabled: boolean;
      timer: {};
      brackets: object[];
      directions: object[];
      index:number;
    } = {
      tracking: value.tracking,
      start: [],
      save_tracking: value.save,
      display: value.display,
      disabled: value.disabled || false,
      timer: TJSON.serialize(value.timer),
      brackets: [],
      directions: [],
      index: -1,
    };
    value.directions.forEach((value: DirectionStorage) => {
      obj.directions.push(DJSON.serialize(value));
    });
    value.start.forEach((value: {session_id: string,time:Point}) => obj.start.push({session_id: value.session_id,time:stringify(value.time)}));
    value.nested.forEach((svalue: Storage) =>{
      let json = BJSON.serialize(svalue as BracketStorage);
      (json as {index: number}).index = (value as unknown as Nested).index.indexOf(svalue.tracking);
      obj.brackets.push(json);
    });
    return obj;
  },

  deserialize(json: object): SessionStorage {
    const value = json as {
      tracking: string;
      start: {session_id: string,time:string}[];
      save_tracking: boolean;
      display: string;
      disabled: boolean;
      timer: {};
      brackets: object[];
      directions: object[];
      index: number;
    };
    const start: {session_id:string,time:Point}[] = [];
    const brackets: Map<string,BracketStorage> = new Map<string,BracketStorage>();
    const index: string[] = [];
    value.brackets.forEach((json: object) =>
    {
      let bracket = BJSON.deserialize(json);
      index[(json as {index: number}).index] = bracket.tracking;
      brackets.set(bracket.tracking,bracket);
    });
    value.start.forEach((json: {session_id: string,time:string}) => start.push({session_id: json.session_id,time:parse(json.time)}));
    const directions: DirectionStorage[] = [];
    value.directions.forEach((json: object) =>
      directions.push(DJSON.deserialize(json))
    );
    return {
      tracking: value.tracking,
      start: start,
      save: value.save_tracking,
      type: Type.SESSION,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      nestedType: Type.BRACKET,
      directions: directions,
      nested: brackets,
      index: index,
    };
  },
};
