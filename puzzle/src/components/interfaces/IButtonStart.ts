import { IEventElement } from './IEventElement';

export interface IButtonStart extends IEventElement {
  textHelp(): void;
  settingSelect(): void;
  updateSelect(level: number, round: number): void;
}
