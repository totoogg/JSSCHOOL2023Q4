import { IEventElement } from './interfaces';

export interface ISoundHelpButton extends IEventElement {
  endedSound(element: HTMLElement): void;
}
