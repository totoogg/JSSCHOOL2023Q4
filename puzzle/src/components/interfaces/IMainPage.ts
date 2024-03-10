import { IHTMLElement } from './interfaces';

export interface IMainPage extends IHTMLElement {
  createLine(): void;
  createButtons(): void;
}
