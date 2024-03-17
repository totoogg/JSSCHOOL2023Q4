import Listener from '../listener';
import { IButtonTotalContinue } from '../../../interfaces/interfaces';

export default class ButtonTotalContinue extends Listener implements IButtonTotalContinue {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.visibleElements();
    this.clickImitation();
  }

  public visibleElements(): void {
    const body = document.querySelector('body') as HTMLElement;
    const child = Array.from(body.children);

    body.classList.remove('background');

    child.forEach((el) => {
      if (
        el.classList.contains('total') ||
        el.classList.contains('description') ||
        el.classList.contains('form')
      ) {
        el.classList.add('display-none');
      } else {
        el.classList.remove('display-none');
      }
    });
  }

  public clickImitation(): void {
    const event = new Event('click');
    const elem = document.querySelector('.field-buttons__check-continue') as HTMLElement;
    elem.dispatchEvent(event);
  }
}
