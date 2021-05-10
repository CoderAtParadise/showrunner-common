import IJson from "./IJson";
import { Nested, Storage, Type } from "./Storage";
import { ItemStorage, JSON as IJSON } from "./Item";
import { JSON as TJSON } from "./Timer";
import { DirectionStorage,JSON as DJSON } from "./Direction";

export interface BracketStorage extends Storage, Nested {}

export const JSON: IJson<BracketStorage> = {
  serialize(value: BracketStorage): object {
    const obj: {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      directions: object[];
      items: object[];
    } = {
      tracking: value.tracking,
      display: value.display,
      disabled: value.disabled || false,
      directions: [],
      timer: TJSON.serialize(value.timer),
      items: [],
    };
    value.nested.forEach((svalue: Storage) => {
      let json = IJSON.serialize(svalue as ItemStorage);
      (json as {index: number}).index = (value as unknown as Nested).index.indexOf(svalue.tracking);
      obj.items.push(json);
    });
    value.directions.forEach((value: DirectionStorage) => {
      obj.directions.push(DJSON.serialize(value));
    });
    return obj;
  },

  deserialize(json: object): BracketStorage {
    const value = json as {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      directions: object[];
      items: object[];
    };
    const items: Map<string, ItemStorage> = new Map<string, ItemStorage>();
    const index: string[] = [];
    value.items.forEach((json: object) => {
      const item = IJSON.deserialize(json);
      index[(json as {index: number}).index] = item.tracking;
      items.set(item.tracking,item);
    });
    const directions: DirectionStorage[] = [];
    value.directions.forEach((json: object) =>
      directions.push(DJSON.deserialize(json))
    );
    return {
      tracking: value.tracking,
      type: Type.BRACKET,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      nestedType: Type.ITEM,
      nested: items,
      directions: directions,
      index:index,
    };
  },
};
