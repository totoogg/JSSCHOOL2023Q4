import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class EditMessage extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const id = this.mainUsersThis.getIdActionMessage();

    this.mainUsersThis.addTextInInput(id!);
  }
}
