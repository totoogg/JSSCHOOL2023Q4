import { IEventElement } from './interfaces';

export interface IButtonResult extends IEventElement {
  hideElements(): void;
  getSound(): string[];
  setImage(): void;
}
