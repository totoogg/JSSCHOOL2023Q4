import { IEventElement, ITranslate } from './interfaces';

export interface IButtonSolution extends IEventElement {
  getCoordinate(el: HTMLElement, block: HTMLElement): ITranslate;
  updateButtonContinue(): void;
}
