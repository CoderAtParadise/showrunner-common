import IJson from "../../IJson";
import { registerPropertyJSON } from "./IProperty";

export type ParentProperty = { key: "parent"; value: string; canOverride: boolean; };

export const INVALID: ParentProperty = {
  key: "parent",
  value:  "",
  canOverride:true
};

const JSON: IJson<ParentProperty> = {
  serialize: (property: ParentProperty): object => {
    return { parent: property.value };
  },
  deserialize: (json: any): ParentProperty => {
    return { key: "parent", value: json as string,canOverride:true };
  },
};

export default registerPropertyJSON("parent", JSON);
