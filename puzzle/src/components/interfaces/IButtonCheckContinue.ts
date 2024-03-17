import { IEventElement } from './interfaces';

export interface IButtonCheckContinue extends IEventElement {
  updateGame(): void;
  updateElements(currentWords: number): void;
  checkResult(): void;
  errorHighlighting(): void;
  showHelp(): void;
  hideHelp(): void;
  updatePageSelect(round: number): void;
  updateLevelSelect(level: number): void;
  saveLocal(level: number, round: number, countRounds: number): void;
  saveLocalSelectLevel(): void;
  saveLocalSelectRound(): void;
}
