import Listener from '../../../listener';
import Unit from '../../../unit';

export default class InputSearch extends Listener {
  public eventListener: string;

  private unitThis = new Unit();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    this.unitThis.checkUsers();
  }
}
