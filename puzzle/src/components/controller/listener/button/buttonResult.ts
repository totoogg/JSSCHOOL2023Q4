import Listener from '../listener';

export default class ButtonResult extends Listener {
  public eventListener: string;

  /*   public game = new FieldResult();

  public updateText = new ButtonStart('click'); */

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();
  }
}
