import IJson from "../IJson";
import { registerPropertyJSON} from "./IProperty";

export type IndexListProperty = {key: "index_list",value: string[]};

export const INVALID: IndexListProperty = {
    key: "index_list",
    value: []
}

const JSON: IJson<IndexListProperty> = {
    serialize: (property: IndexListProperty): object => {
        return {index_list: property.value};
    },
    deserialize: (json: any): IndexListProperty => {
        return {key:"index_list",value: json as string[]};
    }
}

export default registerPropertyJSON("index_list",JSON);