import exp from "constants";
import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";

export type DisplayProperty = { key: "display"; value: string };

export const INVALID: DisplayProperty = {
  key: "display",
  value: ""
};

const JSON: IJson<DisplayProperty> = {
  serialize: (property: DisplayProperty): object => {
    return { display: property.value };
  },
  deserialize: (json: any): DisplayProperty => {
    return { key: "display", value: json as string };
  },
};

export default registerPropertyJSON("display",JSON);