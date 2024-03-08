import { Action } from './interfaces';

export interface IAction {
  eventListener: string;
  callback: Action;
}
