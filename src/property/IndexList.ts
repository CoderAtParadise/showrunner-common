import IJson from "../../IJson";
import { registerPropertyJSON} from "./IProperty";

export type IndexListProperty = {key: "index_list",value: string[];canOverride: boolean;};

export const INVALID: IndexListProperty = {
    key: "index_list",
    value: [],
    canOverride: true
}

const JSON: IJson<IndexListProperty> = {
    serialize: (property: IndexListProperty): object => {
        return {index_list: property.value};
    },
    deserialize: (json: any): IndexListProperty => {
        return {key:"index_list",value: json as string[],canOverride:true};
    }
}

export default registerPropertyJSON("index_list",JSON);