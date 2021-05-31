import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";

type Direction = {}

export type DirectionsProperty = { key: "directions"; value: Map<string,Direction[]> };

export const INVALID: DirectionsProperty = {
  key: "directions",
  value: new Map<string,Direction[]>(),
};

const JSON: IJson<DirectionsProperty> = {
  serialize: (property: DirectionsProperty): object => {
    const directions: object[] = [];
    /*property.value.forEach((value: Direction) =>
      directions.push(DJSON.serialize(value))
    );*/
    return { directions: directions };
  },
  deserialize: (json: any): DirectionsProperty => {
    const directions: Map<string,Direction[]> = new Map<string,Direction[]>();
   /* (json as object[]).forEach((value: object) =>
      directions.push(DJSON.deserialize(value))
    );*/
    return { key: "directions", value: directions };
  },
};

export default registerPropertyJSON("directions", JSON);
