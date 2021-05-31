import IProperty from "./property/IProperty";

export interface Direction<Properties extends IProperty<any>[]> {
    targets: string[];
    command: string;
    properties: Properties;
}