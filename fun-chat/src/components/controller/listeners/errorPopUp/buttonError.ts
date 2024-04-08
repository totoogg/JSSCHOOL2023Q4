import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Work from '../workWithServer';

export default class ButtonError extends Work {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.formStartThis.hiddenError();
  }
}
