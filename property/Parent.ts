import IJson from "../IJson";

interface ParentValue {
  id: string;
  index: number;
}

export type ParentProperty = { key: "parent"; value: ParentValue };

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
