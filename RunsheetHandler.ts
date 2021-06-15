import ClockSource from "./ClockSource";
import Show from "./Show";
import Storage from "./Storage"
import TrackingShow from "./TrackingShow";
import StagePlot from "./stageplot/StagePlot";
import Runsheet from "./Runsheet";

export interface RunsheetHandler {
   setRunsheet: (runsheet:Runsheet) => void;
   dirty: () => boolean;
   markDirty: () => void;
   hasLoadedRunsheet: () => boolean;
   getClock: (id:string) => ClockSource | undefined;
   addClock: (clock:ClockSource) => void;
   getShow: (id:string) => Show | undefined;
   addShow: (show:Show) => void;
   deleteShow: (id:string) => void;
   showList: () => string[];
   getTrackingShow: (id:string) => TrackingShow | undefined;
   addTrackingShow: (trackingShow:TrackingShow) => void;
   deleteTrackingSHow: (id:string) => void;
   sessionList: (show:string) => string[];
   getStorage: (id:string) => Storage<any> | undefined;
   addStorage: (storage:Storage<any>) => void;
   deleteStorage: (id:string) => void;
   //getStagePlot: (id:string) => StagePlot | undefined;
   //addStagePlot: (plot:StagePlot) => void;
}

export default RunsheetHandler;