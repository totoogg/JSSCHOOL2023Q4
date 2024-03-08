import { IUserSave } from './interfaces';

export interface IButtonLogin {
  callback(event: Event): void;
  highlightError(elem: HTMLElement): void;
  saveData?(user: IUserSave): void;
}
