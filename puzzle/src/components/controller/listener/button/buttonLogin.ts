import Listener from '../listener';
import { IButtonLogin } from '../../../interfaces/interfaces';

export default class ButtonLogin extends Listener implements IButtonLogin {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const name = document.querySelector('.form__input-name') as HTMLInputElement;
    const surname = document.querySelector('.form__input-surname') as HTMLInputElement;
    if (!name.value || !surname.value) {
      const errorName = document.querySelector('.error-name') as HTMLElement;
      this.highlightError(errorName);
      const errorSurname = document.querySelector('.error-surname') as HTMLElement;
      this.highlightError(errorSurname);
    }
  }

  public highlightError(elem: HTMLElement): void {
    elem.classList.add('form__input__error');
  }
}
