import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import { IEventUnit } from '../../../interfaces/interfaces';
import Listener from '../listener';

export default class SubmitStartForm extends Listener {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

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
