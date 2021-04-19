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
    value.nested.forEach((value: Storage) =>
      obj.items.push(IJSON.serialize(value as ItemStorage))
    );
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
    const items: Storage[] = [];
    value.items.forEach((json: object) => items.push(IJSON.deserialize(json)));
    return {
      tracking: value.tracking,
      type: Type.BRACKET,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      nestedType: Type.ITEM,
      nested: items,
    };
  },
};
