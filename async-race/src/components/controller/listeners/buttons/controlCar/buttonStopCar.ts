import Util from '../../../util';
import Listener from '../../listener';
import { IEventElement } from '../../../../interfaces/interfaces';

export default class ButtonStopCar extends Listener implements IEventElement {
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
      target.classList.add('disabled');

      const line = target.parentElement?.parentElement?.parentElement as HTMLElement;

      line.setAttribute('data-drive', 'stop');

      this.util.driveStopCar(line);
    }
  }
}
