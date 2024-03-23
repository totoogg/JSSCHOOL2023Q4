import Util from '../../../util';
import Listener from '../../listener';

export default class ButtonCreateCar extends Listener {
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

    if (name.value.trim() !== '') {
      this.util.createCar(name.value.trim(), color.value);
      name.value = '';
    }
  }
}
