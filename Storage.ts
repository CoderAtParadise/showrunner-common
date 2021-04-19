import { Settings } from "./Timer";

export enum Type {
  SESSION = "session",
  BRACKET = "bracket",
  ITEM = "item",
}

export interface Storage {
  tracking: string;
  type: Type;
  display: string;
  disabled: boolean;
  timer: Settings;
}

export interface Nested {
  nestedType: Type;
  nested: Storage[];
}

function canStore(list:Nested,value:Storage): boolean
{
    return list.nestedType === value.type;
}

export function add(list:Nested,value:Storage,index: number = list.nested.length) : boolean
{
    if(index > list.nested.length) index = list.nested.length;
    if(canStore(list,value)) {
        list.nested.splice(index,0,value);
        return true;
    }
    return false;
}

export function remove(list: Nested, index: number): boolean {
    if (index >= list.nested.length) return false;
    list.nested.splice(index, 1);
    return true;
}

export function get(list: Nested, index: number): Storage {
    return list.nested[index];
  }

export function move(source:Nested,sindex: number,target:Nested,tindex:number) : boolean
{
    const value = get(source,sindex);
    if(value && canStore(target,value)) {
        add(target,value,tindex);
        remove(source,sindex);
        return true;
    }
    return false
}
