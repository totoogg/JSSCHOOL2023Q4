import Listener from '../../../listener';
import Unit from '../../../unit';
import { IAction } from '../../../../../interfaces/interfaces';

export default class InputSearch extends Listener implements IAction {
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
