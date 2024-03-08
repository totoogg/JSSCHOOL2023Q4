import { ICheckInput, IEventElement } from './interfaces';

export interface IInputStart extends IEventElement {
  highlightError(elem: HTMLElement): void;
  checkInput(elements: ICheckInput): void;
  unlockButton(): void;
  lockButton(): void;
}
