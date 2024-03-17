import Listener from '../listener';
import { ICheckInput, IEventElement } from '../../../interfaces/interfaces';

export default class InputStart extends Listener implements IEventElement {
  public eventListener: string;

  private button!: HTMLElement;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.button = document.querySelector('.form__button') as HTMLElement;
    const name = document.querySelector('.form__input-name') as HTMLInputElement;
    const surname = document.querySelector('.form__input-surname') as HTMLInputElement;
    const errorName = document.querySelector('.error-name') as HTMLElement;
    const errorSurname = document.querySelector('.error-surname') as HTMLElement;
    const chars: string[] = 'abcdefghijklmnopqrstuvwxyz-'.split('');

    this.checkInput({ name, surname, errorName, errorSurname, chars });

    if (!errorName.textContent && !errorSurname.textContent) {
      this.button.classList.remove('disable');
    } else {
      this.button.classList.add('disable');
    }
  }

  private checkInput({ name, errorName, surname, errorSurname, chars }: ICheckInput): void {
    const inputErrorName = errorName;
    const inputErrorSurname = errorSurname;
    if (!name.value || name.value.length < 3) {
      inputErrorName.textContent = 'The name field requires at least 3 characters';
      errorName.classList.add('form__input__error');
    } else if (name.value[0] !== name.value[0].toUpperCase()) {
      inputErrorName.textContent = 'The first letter must be capitalized';
      errorName.classList.add('form__input__error');
    } else if (!name.value.split('').every((el) => chars.includes(el.toLowerCase()))) {
      inputErrorName.textContent =
        'The first name input fields only accept English alphabet letters and the hyphen';
      errorName.classList.add('form__input__error');
    } else {
      inputErrorName.textContent = '';
      errorName.classList.remove('form__input__error');
    }

    if (!surname.value || surname.value.length < 4) {
      inputErrorSurname.textContent = 'The surname field requires at least 4 characters';
      errorSurname.classList.add('form__input__error');
    } else if (surname.value[0] !== surname.value[0].toUpperCase()) {
      inputErrorSurname.textContent = 'The first letter must be capitalized';
      errorSurname.classList.add('form__input__error');
    } else if (!surname.value.split('').every((el) => chars.includes(el.toLowerCase()))) {
      inputErrorSurname.textContent =
        'The surname input fields only accept English alphabet letters and the hyphen';
      errorSurname.classList.add('form__input__error');
    } else {
      inputErrorSurname.textContent = '';
      errorSurname.classList.remove('form__input__error');
    }
  }
}
