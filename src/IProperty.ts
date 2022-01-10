export interface IProperty<Value> {
    readonly key: string;
    value: Value;
    optional: boolean;
}
