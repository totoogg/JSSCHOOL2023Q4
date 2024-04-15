import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class CancelEdit extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: MouseEvent): void {
    event.preventDefault();

    this.mainUsersThis.showCancelEdit(false);
    this.mainUsersThis.clearInputMessage();
    this.mainUsersThis.activeButtonSendMessage(false);
    this.mainUsersThis.clearMessageEdit();
  }
}
