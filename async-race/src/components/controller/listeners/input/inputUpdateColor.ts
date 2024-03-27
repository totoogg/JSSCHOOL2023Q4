import Listener from '../listener';
import { IEventElement } from '../../../interfaces/interfaces';

export default class InputUpdateColor extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('disabled')) {
      event.preventDefault();
    }
  }
}
