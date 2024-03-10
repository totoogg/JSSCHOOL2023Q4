import { IEventElement } from './interfaces';

export interface IButtonCheckContinue extends IEventElement {
  updateGame(): void;
  updateElements(currentWords: number): void;
  checkResult(): void;
  errorHighlighting(): void;
}
