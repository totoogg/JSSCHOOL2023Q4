import { ITranslate, IEventElement } from './interfaces';

export interface IClickBlock extends IEventElement {
  translateTarget(el: HTMLElement): ITranslate;
  writeInEmptyPlace(el: HTMLElement): void;
  getEmptyPlace(): HTMLElement;
}
