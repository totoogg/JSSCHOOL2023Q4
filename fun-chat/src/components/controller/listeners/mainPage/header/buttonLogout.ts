import { IEventUnit } from '../../../../interfaces/interfaces';
import WebSocketConnect from '../../../../model/webSocketConnect';
import ManipulationFormStart from '../../../../view/util/manipulationFormStart';
import Listener from '../../listener';

export default class ButtonLogout extends Listener {
  public eventListener: string;

  private formStart = new ManipulationFormStart();

  private server = new WebSocketConnect();

  constructor(key: string) {
    super();
    this.eventListener = key;
    this.server.on('USER_LOGOUT', this.userLogout.bind(this));
  }

  public callback(event: Event): void {
    event.preventDefault();

    const userData = this.formStart.getUserData();
    const user = {
      id: userData.id,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: userData.name,
          password: userData.password,
        },
      },
    };

    this.server.connectServer(JSON.stringify(user));
  }

  private userLogout(arg: IEventUnit): void {
    if (!arg.payload.user?.isLogined) {
      this.formStart.startPage();
      this.formStart.removeAttUserData();
    }
  }
}
