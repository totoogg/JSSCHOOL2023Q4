import { IHTMLElement } from './IHTMLElement';

export interface IHeaderView extends IHTMLElement {
  createButtonsHelp(): void;
  createSelectBlock(): void;
}
