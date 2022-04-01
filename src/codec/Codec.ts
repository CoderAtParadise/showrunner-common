import { DefaultCodec } from "./DefaultCodec";

export type serializeTypes =
    | object
    | string
    | number
    | object[]
    | string[]
    | number[];

export interface Codec<T> {
    serialize: (obj: T) => serializeTypes;
    deserialize: (json: serializeTypes) => T;
}

const Codecs: Map<string, Codec<any>> = new Map<string, Codec<any>>();
const CodecAlias: Map<string, string> = new Map<string, string>();

export const getCodec = (key: string): Codec<any> => {
    const codec = Codecs.get(key);
    if (codec) return codec;
    const alias = CodecAlias.get(key);
    if (alias) return getCodec(alias);
    return DefaultCodec;
};

export const addCodec = (key: string, codec: Codec<any>) => {
    Codecs.set(key, codec);
};

export const addCodecAlias = (key: string, codec: string) => {
    CodecAlias.set(key, codec);
};
