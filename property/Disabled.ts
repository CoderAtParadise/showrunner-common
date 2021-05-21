import IJson from "../IJson";

export type DisabledProperty = { key: "disabled"; value: boolean };

export const JSON: IJson<DisabledProperty> = {
  serialize: (property: DisabledProperty): object => {
    return { disabled: property.value };
  },
  deserialize: (json: any): DisabledProperty => {
    return createProperty(json as boolean);
  },
};

export function createProperty(value: boolean): DisabledProperty {
  return { key: "disabled", value: value };
}
