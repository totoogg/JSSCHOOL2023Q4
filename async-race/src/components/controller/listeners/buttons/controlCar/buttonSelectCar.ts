import Listener from '../../listener';
import { IEventElement } from '../../../../interfaces/interfaces';

export default class ButtonSelectCar extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target.classList.contains('disabled')) {
      Array.from(document.querySelectorAll('.block__select')).forEach((el) =>
        el.classList.remove('disabled'),
      );
      target.classList.add('disabled');

      const currentLine = target.parentElement?.parentElement as HTMLElement;

      this.selectElement(currentLine);
    }
  }

  private selectElement(line: HTMLElement): void {
    const text = document.querySelector('.update__text') as HTMLInputElement;
    const color = document.querySelector('.update__color') as HTMLInputElement;
    const button = document.querySelector('.update__button') as HTMLInputElement;

    text.classList.remove('disabled');
    text.value = line.children[0].children[2].textContent as string;
    text.removeAttribute('readonly');
    color.classList.remove('disabled');
    color.value = line.children[1].children[2].getAttribute('data-color') as string;
    button.classList.remove('disabled');
    button.setAttribute('data-id', `${line.parentElement?.getAttribute('data-id')}`);
  }
}
