import { Direction, JSON as DJSON } from "../Direction";
import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";

export type DirectionsProperty = { key: "directions"; value: Direction[] };

export const INVALID: DirectionsProperty = {
  key: "directions",
  value: [],
};

export const JSON: IJson<DirectionsProperty> = {
  serialize: (property: DirectionsProperty): object => {
    const directions: object[] = [];
    property.value.forEach((value: Direction) =>
      directions.push(DJSON.serialize(value))
    );
    return { directions: directions };
  },
  deserialize: (json: any): DirectionsProperty => {
    const directions: Direction[] = [];
    (json as object[]).forEach((value: object) =>
      directions.push(DJSON.deserialize(value))
    );
    return { key: "directions", value: directions };
  },
};

export default registerPropertyJSON("directions", JSON);
