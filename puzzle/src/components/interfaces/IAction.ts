import { Action } from './interfaces';

export interface IAction {
  eventLister: string;
  callback: Action;
}
