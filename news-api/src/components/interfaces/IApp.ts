import { IAppView } from "./IAppView";
import { IController } from "./IController";

export interface IApp {
  controller: IController;
  view: IAppView;
  start(): void;
}