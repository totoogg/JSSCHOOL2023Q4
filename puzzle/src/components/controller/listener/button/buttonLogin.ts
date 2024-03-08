import Listener from '../listener';
import { IButtonLogin, IUserSave } from '../../../interfaces/interfaces';

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
    const errorName = document.querySelector('.error-name') as HTMLElement;
    const errorSurname = document.querySelector('.error-surname') as HTMLElement;

    if (!name.value || !surname.value) {
      this.highlightError(errorName);
      this.highlightError(errorSurname);
    }

    if (!errorName.textContent && !errorSurname.textContent) {
      const user: IUserSave = {
        name: name.value,
        surname: surname.value,
      };
      this.saveData(user);
    }
  }

  public highlightError(elem: HTMLElement): void {
    elem.classList.add('form__input__error');
  }

  public saveData(user: IUserSave): void {
    localStorage.setItem('rssPuzzleUserTotooggJSFE2023Q4', JSON.stringify(user));
  }
}
