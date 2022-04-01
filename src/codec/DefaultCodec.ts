import { Codec, serializeTypes } from "./Codec";

export const DefaultCodec: Codec<any> = {
    serialize(obj: any): string {
        return JSON.stringify(obj);
    },
    deserialize(json: serializeTypes): any {
        return JSON.parse(json as string);
    }
};
