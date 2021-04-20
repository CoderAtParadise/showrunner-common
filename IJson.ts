export default interface IJson<T> {
    serialize: (value:T) => object;
    deserialize: (json:object) => T;
}