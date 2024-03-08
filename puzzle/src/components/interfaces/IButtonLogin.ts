import { IEventElement, IUserSave } from './interfaces';

export interface IButtonLogin extends IEventElement {
  highlightError(elem: HTMLElement): void;
  saveData(user: IUserSave): void;
  loginToTheGame(): void;
}
