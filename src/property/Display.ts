import IJson from "../../IJson";
import { registerPropertyJSON } from "./IProperty";

export type DisplayProperty = { key: "display"; value: string,canOverride: boolean; };

export const INVALID: DisplayProperty = {
  key: "display",
  value: "",
  canOverride: true
};

const JSON: IJson<DisplayProperty> = {
  serialize: (property: DisplayProperty): object => {
    return { display: property.value };
  },
  deserialize: (json: any): DisplayProperty => {
    return { key: "display", value: json as string,canOverride:true };
  },
};

export default registerPropertyJSON("display", JSON);
