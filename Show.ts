import IProperty from "./property/IProperty";

export interface Show {
  id: string;
  index: number;
  tracking_list: string[];
  overrides: Map<string, IProperty<any>[]>;
}

export default Show;
