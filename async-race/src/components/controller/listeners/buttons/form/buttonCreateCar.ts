import Util from '../../../util';
import Listener from '../../listener';
import { IEventElement } from '../../../../interfaces/interfaces';

export default class ButtonCreateCar extends Listener implements IEventElement {
  public eventListener: string;

  private util = new Util();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const name = document.querySelector('.create__text') as HTMLInputElement;
    const color = document.querySelector('.create__color') as HTMLInputElement;
    const target = event.target as HTMLElement;

    if (!target.classList.contains('disabled')) {
      if (name.value.trim() !== '') {
        this.util.createCar(name.value.trim(), color.value);
        name.value = '';
      }
    }
  }
}
