import Listener from '../listener';
import { IButtonResult } from '../../../interfaces/interfaces';

export default class ButtonResult extends Listener implements IButtonResult {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.hideElements();
  }

  public hideElements(): void {
    const body = document.querySelector('body') as HTMLElement;
    const child = Array.from(body.children);

    body.classList.add('background');

    child.forEach((el) => {
      if (!el.classList.contains('total')) {
        el.classList.add('display-none');
      } else {
        el.classList.remove('display-none');
      }
    });
  }
}
