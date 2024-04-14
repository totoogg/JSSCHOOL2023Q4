import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import Listener from '../listener';

export default class ButtonInfoBack extends Listener {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.formStartThis.hiddenInfo();

    if (this.mainUsersThis.checkMessage()) {
      this.mainUsersThis.updateMessageScrolling();
    }
  }
}
