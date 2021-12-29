export interface IJson<T> {
    serialize: (value: T) => object;
    deserialize: (json: any) => T;
}

export default IJson;
