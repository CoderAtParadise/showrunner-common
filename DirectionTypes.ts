import Direction from "./Direction";
import DirectionCommand, { registerDirectionCommand } from "./DirectionCommand";
import {
  MessageProperty,
  INVALID as INVALID_MESSAGE,
} from "./property/directions/Message";
import {
  DisabledProperty,
  INVALID as INVALID_DISABLED,
} from "./property/Disabled";
import {
  StagePlotProperty,
  INVALID as INVALID_STAGEPLOT,
} from "./property/directions/StagePlot";
import RunsheetHandler from "./RunsheetHandler";

type MessageProperties = [DisabledProperty, MessageProperty];
type StagePlotProperties = [DisabledProperty, StagePlotProperty];

const MessageCommand: DirectionCommand<MessageProperties> = {
  properties: [INVALID_DISABLED, INVALID_MESSAGE],
  run: (
    handler: RunsheetHandler,
    showid: string,
    id: string,
    direction: Direction<MessageProperties>
  ): void => {
      if(handler.hasLoadedRunsheet())
      {
          const show = handler.getShow(showid);
          const storage = handler.getStorage(id);
          if(show && storage)
          {
            
          }
      }
  },
};

const StagePlotCommand: DirectionCommand<StagePlotProperties> = {
  properties: [INVALID_DISABLED, INVALID_STAGEPLOT],
  run: (
    handler: RunsheetHandler,
    showid: string,
    id: string,
    direction: Direction<StagePlotProperties>
  ): void => {},
};

function registerDirectionsCommands(): void {
  registerDirectionCommand("message", MessageCommand);
  //registerDirectionCommand("stageplot", StagePlotCommand);
}

export default registerDirectionsCommands();
