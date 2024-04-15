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
      if (this.mainUsersThis.checkEdit()) {
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
      } else {
        this.editMessage();
      }
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

  private editMessage(): void {
    const id = this.mainUsersThis.getIdInput();
    const value = this.mainUsersThis.getMessageValue();

    const message: IEventUnit = {
      id: String(Date.now()),
      type: 'MSG_EDIT',
      payload: {
        message: {
          id: id!,
          text: value,
        },
      },
    };

    this.sendServerData(message);

    this.mainUsersThis.showCancelEdit(false);
    this.mainUsersThis.clearInputMessage();
    this.mainUsersThis.activeButtonSendMessage(false);
    this.mainUsersThis.clearMessageEdit();
  }
}
