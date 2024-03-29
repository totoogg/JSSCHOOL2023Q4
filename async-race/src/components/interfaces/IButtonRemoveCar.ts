import { IEventElement } from './interfaces';

export interface IButtonRemoveCar extends IEventElement {
  updateWinner(sort: string, order: string): void;
}
