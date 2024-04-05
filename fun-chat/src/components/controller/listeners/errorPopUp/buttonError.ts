import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';

export default class ButtonError extends Listener {
  public eventListener: string;

  private formStart = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.formStart.hiddenError();
  }
}
