import Listener from '../listener';
import { IButtonLogout, IUserSave } from '../../../interfaces/interfaces';

export default class ButtonLogout extends Listener implements IButtonLogout {
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

    this.cleanFieldGame();

    document.body.classList.remove('background');

    const users = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4') as string;
    const usersArr: IUserSave[] = JSON.parse(users);
    const filetUser = usersArr.filter((el) => !el.login);

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(filetUser));
  }

  cleanFieldGame(): void {
    const fieldClick = document.querySelector('.main__field-click') as HTMLElement;
    const lineResult = Array.from(
      document.querySelectorAll('.field-result__line'),
    ) as HTMLElement[];

    fieldClick.innerHTML = '';

    lineResult.forEach((el) => {
      const element = el;
      element.innerHTML = '';
    });
  }
}
