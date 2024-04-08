import Unit from '../../../unit';
import Work from '../../../workWithServer';

export default class InputSearch extends Work {
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
