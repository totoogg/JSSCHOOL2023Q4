import { IEventUnit } from './interfaces';

export interface IWorkWithServer {
  sendServerData(data: IEventUnit): void;
  openConnect(data: IEventUnit): void;
  closeConnect(data: IEventUnit): void;
}
