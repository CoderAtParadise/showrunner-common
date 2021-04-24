import IJson from "./IJson";
import { Nested, Storage, Type } from "./Storage";
import { ItemStorage, JSON as IJSON } from "./Item";
import { JSON as TJSON } from "./Timer";

export interface BracketStorage extends Storage, Nested {}

export const JSON: IJson<BracketStorage> = {
  serialize(value: BracketStorage): object {
    const obj: {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      items: object[];
    } = {
      tracking: value.tracking,
      display: value.display,
      disabled: value.disabled || false,
      timer: TJSON.serialize(value.timer),
      items: [],
    };
    value.nested.forEach((svalue: Storage) => {
      let json = IJSON.serialize(svalue as ItemStorage);
      (json as {index: number}).index = (value as unknown as Nested).index.indexOf(svalue.tracking);
      obj.items.push(json);
    });
    return obj;
  },

  deserialize(json: object): BracketStorage {
    const value = json as {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      items: object[];
    };
    const items: Map<string, ItemStorage> = new Map<string, ItemStorage>();
    const index: string[] = [];
    value.items.forEach((json: object) => {
      const item = IJSON.deserialize(json);
      index[(json as {index: number}).index] = item.tracking;
      items.set(item.tracking,item);
    });
    return {
      tracking: value.tracking,
      type: Type.BRACKET,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      nestedType: Type.ITEM,
      nested: items,
      index:index,
    };
  },
};
