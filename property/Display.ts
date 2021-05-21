import IJson from "../IJson";

export type DisplayProperty = { key: "display"; value: string };

export const JSON: IJson<DisplayProperty> = {
  serialize: (property: DisplayProperty): object => {
    return { display: property.value };
  },
  deserialize: (json: any): DisplayProperty => {
    return createProperty(json as string);
  },
};

export function createProperty(value: string): DisplayProperty {
  return { key: "display", value: value };
}
