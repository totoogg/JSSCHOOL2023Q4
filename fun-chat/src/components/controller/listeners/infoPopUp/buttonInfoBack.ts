import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import Router from '../../router/router';
import Listener from '../listener';
import { IAction } from '../../../interfaces/interfaces';

export default class ButtonInfoBack extends Listener implements IAction {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private mainUsersThis = new ManipulationMainUsers();

  private routerThis = new Router();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const session = sessionStorage.getItem('totoogg-JSFE2023Q4');

    if (session) {
      sessionStorage.setItem('pageTotoogg-JSFE2023Q4', 'main');
      this.routerThis.navigate('main');
    } else {
      sessionStorage.setItem('pageTotoogg-JSFE2023Q4', 'login');
      this.routerThis.navigate('login');
    }

    this.formStartThis.hiddenInfo();

    if (this.mainUsersThis.checkMessage()) {
      this.mainUsersThis.updateMessageScrolling();
    }

    this.mainUsersThis.showCancelEdit(false);
    this.mainUsersThis.clearInputMessage();
    this.mainUsersThis.activeButtonSendMessage(false);
    this.mainUsersThis.clearMessageEdit();
  }
}
