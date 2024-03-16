import Listener from '../../listener';
import FieldResult from '../../../fieldGame/fieldResult';
import { IEventElement } from '../../../../interfaces/interfaces';

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

    imageHelpButton.classList.toggle('active');
    this.game.addBackgroundClickBlock();
  }
}
