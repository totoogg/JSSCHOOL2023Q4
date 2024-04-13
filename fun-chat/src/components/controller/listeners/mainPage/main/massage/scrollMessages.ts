import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IEventUnit } from '../../../../../interfaces/IEventUnit';

export default class ScrollMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    if (this.mainUsersThis.checkAttMessages() === 'true') {
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

    this.mainUsersThis.showActionMessage(false);
    this.mainUsersThis.writeIdActionMessage('');
  }
}
