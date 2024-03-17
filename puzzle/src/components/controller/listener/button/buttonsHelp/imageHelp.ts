import Listener from '../../listener';
import FieldResult from '../../../fieldGame/fieldResult';
import { IEventElement, IUserSave } from '../../../../interfaces/interfaces';

export default class ImageHelpButton extends Listener implements IEventElement {
  public eventListener: string;

  public game = new FieldResult();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const imageHelpButton = document.querySelector('.text-help__image') as HTMLElement;
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const index = localData.findIndex((el) => el.login);

    imageHelpButton.classList.toggle('active');
    this.game.addBackgroundClickBlock();

    if (imageHelpButton.classList.contains('active')) {
      localData[index].imageHelp = true;
    } else {
      localData[index].imageHelp = false;
    }

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }
}
