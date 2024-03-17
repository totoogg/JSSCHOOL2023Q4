import * as sentences from '../../../model/data/wordCollection';
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
        login: true,
        textHelp: true,
        soundHelp: true,
        imageHelp: true,
        level: this.getArrSelect(),
      };

      this.saveData(user);

      this.loginToTheGame();
    }
  }

  public highlightError(elem: HTMLElement): void {
    elem.classList.add('form__input__error');
  }

  public saveData(user: IUserSave): void {
    const users: string | null = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4');
    const arrData: IUserSave[] = [user];

    if (users) {
      arrData.push(...JSON.parse(users));
    }

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(arrData));
  }

  public loginToTheGame(): void {
    const form = document.querySelector('.form') as HTMLElement;
    const header = document.querySelector('.header') as HTMLElement;
    const blockDescription = document.querySelector('.description') as HTMLElement;
    const blockHelp = document.querySelector('.header__block-help') as HTMLElement;
    const selectHelp = document.querySelector('.header__select-block') as HTMLElement;
    const body = document.body as HTMLElement;

    form.classList.add('display-none');
    blockHelp.classList.add('display-none');
    selectHelp.classList.add('display-none');
    header.classList.remove('display-none');
    blockDescription.classList.remove('display-none');
    body.classList.add('background');

    this.settingName();
  }

  public settingName(): void {
    const users = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4');
    let usersArr: IUserSave[] | [];

    if (users) {
      usersArr = JSON.parse(users);
    } else {
      usersArr = [];
    }

    const name = usersArr.find((el) => el.login);

    const greeting = document.querySelector('.description__greeting');

    if (greeting) {
      greeting.textContent = `Hello ${name?.name} ${name?.surname}`;
    }
  }

  public getArrSelect(): boolean[][] {
    const text = Object.values(sentences);
    const arr = Array(text.length).fill(false);
    const arrSelect = arr.map((el, index) => {
      const arrOption = Array(text[index].rounds.length).fill(false);
      return arrOption;
    });
    return arrSelect;
  }
}
