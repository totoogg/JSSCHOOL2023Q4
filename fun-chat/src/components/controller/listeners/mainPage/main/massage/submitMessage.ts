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
      this.readedMessage();
    }
  }

  private readedMessage(): void {
    if (this.mainUsersThis.checkDividingStrip()) {
      const arrIdMessages = this.mainUsersThis.getIdMessagesDelivered();

      this.mainUsersThis.clearStrip();
      this.mainUsersThis.clearCountMessage();

      arrIdMessages.forEach((el) => {
        const status: IEventUnit = {
          id: String(Date.now()),
          type: 'MSG_READ',
          payload: {
            message: {
              id: el!,
            },
          },
        };

        this.sendServerData(status);
      });
    }
  }
}
