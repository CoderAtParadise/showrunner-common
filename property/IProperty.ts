import IJson from "../IJson";

export interface IProperty<Value> {
  key: string;
  value: Value;
}

export const INVALID: IProperty<undefined> = {
  key:"invalid",
  value: undefined,
};

const PropertyRegistry: Map<string,IJson<any>> = new Map<string,IJson<any>>();

export function registerProperty<Value,Data extends IProperty<Value>>(key:string,property:IJson<Data>) : void {
  PropertyRegistry.set(key,property);
}

export function getProperty(key:string): IJson<any>  {
  return PropertyRegistry.get(key);
}

export default IProperty;