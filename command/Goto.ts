import ICommand from "./ICommand";

interface GotoLocal {
    show: [];
    tracking: {show: string; active: string; next:string;}
    runsheet: any;
}

interface GotoData {
  show: string;
  tracking: string;
}

function isGotoData(obj: any): obj is GotoData {
  return obj.show !== undefined && obj.tracking !== undefined;
}

const GotoCommand: ICommand<GotoLocal, GotoData> = {
  id: "goto",
  validate: (data: any) => {
    return isGotoData(data);
  },
  run: (local: GotoLocal, data: GotoData) => {},
};
