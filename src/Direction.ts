import { IProperty } from "./IProperty";

export interface IDirection<Properties extends IProperty<any>[]> {
    readonly self: string;
    command: string;
    properties: Properties;
}
