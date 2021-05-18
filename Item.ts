import IJson from "./IJson";
import { Storage, Type } from "./Storage";
import { DirectionStorage, JSON as DJSON } from "./Direction";
import { JSON as TJSON } from "./Timer";

export interface ItemStorage extends Storage {
}

export const JSON: IJson<ItemStorage> = {
  serialize(value: ItemStorage): object {
    const obj: {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      directions: object[];
    } = {
      tracking: value.tracking,
      display: value.display,
      disabled: value.disabled || false,
      timer: TJSON.serialize(value.timer),
      directions: [],
    };
    return obj;
  },

  deserialize(json: object): ItemStorage {
    const value = json as {
      tracking: string;
      display: string;
      disabled: boolean;
      timer: {};
      directions: object[];
    };
    return {
      tracking: value.tracking,
      type: Type.ITEM,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      directions: [],
    };
  },
};
