import { IAction } from './interfaces';

export interface IParams {
  tag: string;
  classNames?: string[];
  textContent?: string;
  action: IAction | null;
}
