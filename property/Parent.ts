import IJson from "../IJson";
import { registerProperty } from "./IProperty";

interface ParentValue {
  id: string;
  index: number;
}

export type ParentProperty = { key: "parent"; value: ParentValue };

export const INVALID: ParentProperty = {
  key: "parent",
  value: { id: "", index: -1 },
};

export const JSON: IJson<ParentProperty> = {
  serialize: (property: ParentProperty): object => {
    return { parent: property.value };
  },
  deserialize: (json: any): ParentProperty => {
    return createProperty(json as ParentValue);
  },
};

export function createProperty(value: ParentValue): ParentProperty {
  return { key: "parent", value: value };
}

export default registerProperty("parent", JSON);
