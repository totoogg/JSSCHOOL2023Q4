import Util from '../../../util';
import Listener from '../../listener';
import { carCompany, carModel } from '../../../../model/data/cars';
import { IEventElement } from '../../../../interfaces/interfaces';

export default class ButtonGenerateCars extends Listener implements IEventElement {
  public eventListener: string;

  private util = new Util();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target.classList.contains('disabled')) {
      for (let index = 0; index < 100; index += 1) {
        const color = `#${this.util.randomRange(0, 255).toString(16).padStart(2, '0')}${this.util.randomRange(0, 255).toString(16).padStart(2, '0')}${this.util.randomRange(0, 255).toString(16).padStart(2, '0')}`;
        const name = `${carCompany[this.util.randomRange(0, carCompany.length - 1)]} ${carModel[this.util.randomRange(0, carModel.length - 1)]}`;

        this.util.createCar(name, color);
      }
    }
  }
}
