import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IEventUnit } from '../../../../../interfaces/interfaces';

export default class SubmitMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    if (!this.mainUsersThis.checkButtonSend()) {
      const value = this.mainUsersThis.getMessageValue();

      const message: IEventUnit = {
        id: String(Date.now()),
        type: 'MSG_SEND',
        payload: {
          message: {
            to: this.mainUsersThis.getUserToSend(),
            text: value,
          },
        },
      };

      this.sendServerData(message);
      this.mainUsersThis.clearInputMessage();
      this.mainUsersThis.buttonSend(false);
    }
  }
}
