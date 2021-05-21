import { Direction, JSON as DJSON } from "../Direction";
import IJson from "../IJson";
import { registerProperty } from "./IProperty";

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
    return createProperty(directions);
  },
};

export function createProperty(value: Direction[]): DirectionsProperty {
  return { key: "directions", value: value };
}

export default registerProperty("directions", JSON);
