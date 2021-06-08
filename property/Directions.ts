import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";
import Direction,{JSON as DJSON} from "../Direction";

export type DirectionsProperty = { key: "directions"; value:Direction<any>[] };

export const INVALID: DirectionsProperty = {
  key: "directions",
  value: [],
};

const JSON: IJson<DirectionsProperty> = {
  serialize: (property: DirectionsProperty): object => {
    const directions: object[] = [];
    property.value.forEach((value: Direction<any>) =>
      directions.push(DJSON.serialize(value))
    );
    return { directions: directions };
  },
  deserialize: (json: any): DirectionsProperty => {
    const directions: Direction<any>[] = [];
    (json as object[]).forEach((value: object) =>
      directions.push(DJSON.deserialize(value))
    );
    return { key: "directions", value: directions };
  },
};

export default registerPropertyJSON("directions", JSON);
