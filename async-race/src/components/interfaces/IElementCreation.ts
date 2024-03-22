import { IParams, IAction } from './interfaces';

export interface IElementCreation {
  getElement(): HTMLElement | null;
  createElement(params: IParams): void;
  setCssClasses(classes: string[]): void;
  setText(text: string): void;
  setAction(action: IAction): void;
}
