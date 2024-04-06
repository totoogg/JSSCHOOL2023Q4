import WebSocketConnect from '../../../model/webSocketConnect';
import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';
import { IEventUnit } from '../../../interfaces/interfaces';

export default class SubmitStartForm extends Listener {
  public eventListener: string;

  private formStart = new ManipulationFormStart();

  private server = new WebSocketConnect();

  constructor(key: string) {
    super();
    this.eventListener = key;
    this.addUnitEvent();
  }

  public callback(event: Event): void {
    event.preventDefault();

    if (!this.formStart.checkButton()) {
      const user: IEventUnit = {
        id: String(Date.now()),
        type: 'USER_LOGIN',
        payload: {
          user: {
            login: this.formStart.getNameValue(),
            password: this.formStart.getPasswordValue(),
          },
        },
      };
      this.server.connectServer(JSON.stringify(user));
    }
  }

  private addUnitEvent(): void {
    this.server.on('USER_LOGIN', this.userLogin.bind(this));
    this.server.on('ERROR', this.userShowError.bind(this));
  }

  private userLogin(arg: IEventUnit): void {
    this.formStart.hiddenFormStart();
    this.formStart.showMain(arg.id);
  }

  private userShowError(arg: IEventUnit): void {
    this.formStart.showError(arg.payload.error!);
  }
}
