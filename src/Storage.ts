import { IProperty } from "./IProperty";
import { ShowHandler } from "./ShowHandler";

export class Storage<Properties extends IProperty<any>[]> {
    constructor(id: string, type: string, properties: Properties) {
        this.id = id;
        this.type = type;
        this.properties = properties;
    }

    hasProperty(key: string): boolean {
        return (
            this.properties?.some(
                (property: IProperty<any>) => property.key === key
            ) || false
        );
    }

    getDefaultProperty(key: string): IProperty<any> | undefined {
        if (this.hasProperty(key)) {
            return this.properties?.find(
                (property: IProperty<any>) => property.key === key
            );
        }
    }

    getProperty(
        showHandler: ShowHandler,
        key: string
    ): IProperty<any> | undefined {
        if (this.hasProperty(key)) {
            if (showHandler.hasOverrideProperty(this.id, key))
                return showHandler.getOverrideProperty(this.id, key);
            else return this.getDefaultProperty(key);
        }
        return undefined;
    }

    setDefaultProperty(property: IProperty<any>): void {
        const def = this.getDefaultProperty(property.key);
        if (def) def.value = property.value;
    }

    readonly id: string;
    readonly type: string;
    private properties: Properties | undefined;
}
