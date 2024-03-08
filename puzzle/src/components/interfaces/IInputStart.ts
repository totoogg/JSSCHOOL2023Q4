import { IButtonLogin, ICheckInput } from './interfaces';

export interface IInputStart extends IButtonLogin {
  checkInput(elements: ICheckInput): void;
  unlockButton(): void;
  lockButton(): void;
}
