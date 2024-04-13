import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IEventUnit } from '../../../../../interfaces/interfaces';

export default class DeleteMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const status: IEventUnit = {
      id: String(Date.now()),
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: this.mainUsersThis.getIdActionMessage()!,
        },
      },
    };

    this.sendServerData(status);
  }
}
