import Util from '../../../util';
import Listener from '../../listener';

export default class ButtonStartCar extends Listener {
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
      const line = target.parentElement?.parentElement?.parentElement as HTMLElement;

      line.setAttribute('data-drive', 'start');

      this.util.driveStartCar(line);
    }
  }
}
