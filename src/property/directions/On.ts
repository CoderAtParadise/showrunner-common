import IJson from "../../../IJson";
import { registerPropertyJSON } from "../IProperty";

export type OnProperty = { key: "on"; value: string };

export const INVALID: OnProperty = {
    key: "on",
    value: ""
}

const JSON: IJson<OnProperty> = {
    serialize: (property: OnProperty): object => {
        return { message: property.value };
    },
    deserialize: (json: any): OnProperty => {
        return { key: "on", value: json as string }
    }
}

export default registerPropertyJSON("on",JSON);