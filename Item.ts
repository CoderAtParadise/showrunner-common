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
    value.directions.forEach((value: DirectionStorage) => {
      obj.directions.push(DJSON.serialize(value));
    });
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
    const directions: DirectionStorage[] = [];
    value.directions.forEach((json: object) =>
      directions.push(DJSON.deserialize(json))
    );
    return {
      tracking: value.tracking,
      type: Type.ITEM,
      display: value.display,
      disabled: value.disabled,
      timer: TJSON.deserialize(value.timer),
      directions: directions,
    };
  },
};
