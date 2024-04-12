import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class ScrollMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    if (this.mainUsersThis.checkAttMessages() === 'true') {
      this.mainUsersThis.clearStrip();
    }
  }
}
