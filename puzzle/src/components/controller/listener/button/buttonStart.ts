import Listener from '../listener';
import FieldResult from '../../fieldGame/fieldResult';
import { IEventElement } from '../../../interfaces/interfaces';

export default class ButtonStart extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const childrenBody: Element[] = Array.from(document.body.children);

    childrenBody.forEach((el) => {
      if (el.classList.contains('header') || el.classList.contains('main')) {
        el.classList.remove('display-none');
      } else {
        el.classList.add('display-none');
      }
    });

    const start = new FieldResult();
    start.setSentence();
  }
}
