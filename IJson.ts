export default interface IJson<T,U = T> {
    serialize: (value:U) => object;
    deserialize: (json:object) => T;
}