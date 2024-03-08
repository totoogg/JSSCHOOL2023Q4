import Listener from '../listener';
import { ICheckInput, IInputStart } from '../../../interfaces/interfaces';

export default class InputStart extends Listener implements IInputStart {
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
    const chars: string[] = 'abcdefghijklmnopqrstuvwxyz-'.split('');

    this.checkInput({ name, surname, errorName, errorSurname, chars });

    if (!errorName.textContent && !errorSurname.textContent) {
      this.unlockButton();
    } else {
      this.lockButton();
    }
  }

  public highlightError(elem: HTMLElement): void {
    elem.classList.add('form__input__error');
  }

  public checkInput({ name, errorName, surname, errorSurname, chars }: ICheckInput): void {
    const inputErrorName = errorName;
    const inputErrorSurname = errorSurname;
    if (!name.value || name.value.length < 3) {
      inputErrorName.textContent = 'The name field requires at least 3 characters';
      this.highlightError(errorName);
    } else if (name.value[0] !== name.value[0].toUpperCase()) {
      inputErrorName.textContent = 'The first letter must be capitalized';
      this.highlightError(errorName);
    } else if (!name.value.split('').every((el) => chars.includes(el.toLowerCase()))) {
      inputErrorName.textContent =
        'The first name input fields only accept English alphabet letters and the hyphen';
      this.highlightError(errorName);
    } else {
      inputErrorName.textContent = '';
      errorName.classList.remove('form__input__error');
    }

    if (!surname.value || surname.value.length < 4) {
      inputErrorSurname.textContent = 'The surname field requires at least 4 characters';
      this.highlightError(errorSurname);
    } else if (surname.value[0] !== surname.value[0].toUpperCase()) {
      inputErrorSurname.textContent = 'The first letter must be capitalized';
      this.highlightError(errorSurname);
    } else if (!surname.value.split('').every((el) => chars.includes(el.toLowerCase()))) {
      inputErrorSurname.textContent =
        'The surname input fields only accept English alphabet letters and the hyphen';
      this.highlightError(errorSurname);
    } else {
      inputErrorSurname.textContent = '';
      errorSurname.classList.remove('form__input__error');
    }
  }

  public unlockButton(): void {
    const button = document.querySelector('.form__button') as HTMLButtonElement;
    button.classList.remove('disable');
  }

  public lockButton(): void {
    const button = document.querySelector('.form__button') as HTMLButtonElement;
    button.classList.add('disable');
  }
}
