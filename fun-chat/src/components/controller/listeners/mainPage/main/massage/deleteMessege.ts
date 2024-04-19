import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IAction, IEventUnit } from '../../../../../interfaces/interfaces';

export default class DeleteMessage extends Listener implements IAction {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const id = this.mainUsersThis.getIdActionMessage();

    const status: IEventUnit = {
      id: String(Date.now()),
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: id!,
        },
      },
    };

    if (this.mainUsersThis.getIdInput() === id) {
      this.mainUsersThis.showCancelEdit(false);
      this.mainUsersThis.clearInputMessage();
      this.mainUsersThis.activeButtonSendMessage(false);
      this.mainUsersThis.clearMessageEdit();
    }

    this.sendServerData(status);
  }
}
