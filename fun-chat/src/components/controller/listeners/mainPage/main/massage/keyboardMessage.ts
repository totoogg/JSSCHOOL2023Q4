import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class KeyboardMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const value = this.mainUsersThis.getMessageValue();

    if (value.trim().length > 0) {
      this.mainUsersThis.buttonSend(true);
    } else {
      this.mainUsersThis.buttonSend(false);
    }
  }
}
