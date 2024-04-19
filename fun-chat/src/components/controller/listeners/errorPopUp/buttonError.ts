import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import Listener from '../listener';
import { IAction } from '../../../interfaces/interfaces';

export default class ButtonError extends Listener implements IAction {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.formStartThis.hiddenError();
    this.mainUsersThis.showCancelEdit(false);
    this.mainUsersThis.clearInputMessage();
    this.mainUsersThis.activeButtonSendMessage(false);
    this.mainUsersThis.clearMessageEdit();
  }
}
