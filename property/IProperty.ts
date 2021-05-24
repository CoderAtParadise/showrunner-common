import IJson from "../IJson";

export interface IProperty<Value> {
  key: string;
  value: Value;
}

export const INVALID: IProperty<undefined> = {
  key:"invalid",
  value: undefined,
};

const INVALID_JSON : IJson<IProperty<undefined>> = {
  serialize: (value:IProperty<undefined>) : object => {
    return {};
  },
  deserialize: (json:any): IProperty<undefined> => {
    return INVALID;
  }
}

const PropertyRegistry: Map<string,IJson<any>> = new Map<string,IJson<any>>();

export function registerPropertyJSON<Value,Data extends IProperty<Value>>(key:string,property:IJson<Data>) : void {
  PropertyRegistry.set(key,property);
}

export function getPropertyJSON(key:string): IJson<any>  {
  return PropertyRegistry.get(key) || INVALID_JSON;
}

export default IProperty;