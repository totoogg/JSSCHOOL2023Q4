import Listener from '../../listener';
import { IEventElement, IUserSave } from '../../../../interfaces/interfaces';

export default class TextHelpButton extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const textHelpButton = document.querySelector('.text-help__text') as HTMLElement;
    const textHelp = document.querySelector('.field-help__text-help') as HTMLElement;

    textHelpButton.classList.toggle('active');
    textHelp.classList.toggle('hide');

    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const index = localData.findIndex((el) => el.login);

    if (textHelpButton.classList.contains('active')) {
      localData[index].textHelp = true;
    } else {
      localData[index].textHelp = false;
    }

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }
}
