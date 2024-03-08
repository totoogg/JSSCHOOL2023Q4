import Listener from '../listener';
import { IEventElement, IUserSave } from '../../../interfaces/interfaces';

export default class ButtonLogout extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const childrenBody: Element[] = Array.from(document.body.children);

    childrenBody.forEach((el) => {
      if (el.classList.contains('form')) {
        el.classList.remove('display-none');
      } else {
        el.classList.add('display-none');
      }
    });

    const users = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4') as string;
    const usersArr: IUserSave[] = JSON.parse(users);
    const filetUser = usersArr.filter((el) => !el.login);

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(filetUser));
  }
}
