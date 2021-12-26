import IProperty from "./src/property/IProperty";
import Direction from "./Direction";
import RunsheetHandler from "./RunsheetHandler";

export interface DirectionCommand<Properties extends IProperty<any>[]> {
  properties: Properties;
  run: (handler:RunsheetHandler,showid: string, id: string, direction: Direction<any>) => void;
}

const DirectionCommandRegistry: Map<string, DirectionCommand<any>> = new Map<
  string,
  DirectionCommand<any>
>();

export function registerDirectionCommand(
  id: string,
  command: DirectionCommand<any>
): void {
  DirectionCommandRegistry.set(id, command);
}

export function getDirectionCommand(
  id: string
): DirectionCommand<any> | undefined {
  return DirectionCommandRegistry.get(id);
}

export default DirectionCommand;
