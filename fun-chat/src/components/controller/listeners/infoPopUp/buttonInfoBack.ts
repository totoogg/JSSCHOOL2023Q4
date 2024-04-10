import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';

export default class ButtonInfoBack extends Listener {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.formStartThis.hiddenInfo();
  }
}
