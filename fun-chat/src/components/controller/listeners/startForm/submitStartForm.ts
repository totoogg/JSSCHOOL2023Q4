import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';
import Router from '../../router/router';
import { IAction, IEventUnit } from '../../../interfaces/interfaces';

export default class SubmitStartForm extends Listener implements IAction {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private routerThis = new Router();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    if (!this.formStartThis.checkButton()) {
      const user: IEventUnit = {
        id: String(Date.now()),
        type: 'USER_LOGIN',
        payload: {
          user: {
            login: this.formStartThis.getNameValue(),
            password: this.formStartThis.getPasswordValue(),
          },
        },
      };

      this.sendServerData(user);
    }
  }
}
