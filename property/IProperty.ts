import IJson from "../IJson";

export interface IProperty<Value> {
  key: string;
  value: Value;
}

export const INVALID: IProperty<undefined> = {
  key: "invalid",
  value: undefined,
};

const INVALID_JSON: IJson<IProperty<undefined>> = {
  serialize: (value: IProperty<undefined>): object => {
    return {};
  },
  deserialize: (json: any): IProperty<undefined> => {
    return INVALID;
  }
}

export function hasEitherProperty<Either extends IProperty<any>[]>(either: Either, properties: IProperty<any>[]) {
  let found = false;
  let multiple = false;
  either.forEach((value: IProperty<any>) => {
    if (properties.find((prop: IProperty<any>) => value.key === prop.key)) {
      if (found)
        multiple = true;
      found = true;
      return true;
    }
  });
  return found && !multiple;
}

export function hasAllProperties<Required extends IProperty<any>[]>(
  required: Required,
  properties: IProperty<any>[]
): properties is Required {
  if (properties.length < required.length) return false;
  return required.every((value: IProperty<any>) => {
    return properties.find((prop: IProperty<any>) => value.key === prop.key) !== undefined;
  });
}

const PropertyRegistry: Map<string, IJson<any>> = new Map<string, IJson<any>>();

export function registerPropertyJSON<Value, Data extends IProperty<Value>>(key: string, property: IJson<Data>): void {
  PropertyRegistry.set(key, property);
}

export function getPropertyJSON(key: string): IJson<any> {
  return PropertyRegistry.get(key) || INVALID_JSON;
}

export default IProperty;