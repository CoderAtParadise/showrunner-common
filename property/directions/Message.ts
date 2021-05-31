import IJson from "../../IJson";
import { registerPropertyJSON } from "../IProperty";

export type MessageProperty = { key: "message"; value: string };

export const INVALID: MessageProperty = {
    key: "message",
    value: ""
}

const JSON: IJson<MessageProperty> = {
    serialize: (property: MessageProperty): object => {
        return { message: property.value };
    },
    deserialize: (json: any): MessageProperty => {
        return { key: "message", value: json as string }
    }
}

export default registerPropertyJSON("message",JSON);