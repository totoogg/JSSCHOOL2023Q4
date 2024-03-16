import { IEventElement } from './interfaces';

export interface ISelectBlock extends IEventElement {
  changeGameField(): void;
  updateFieldGame(): void;
}
