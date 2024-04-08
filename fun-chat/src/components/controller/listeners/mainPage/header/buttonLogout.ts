import WebSocketConnect from '../../../../model/webSocketConnect';
import ManipulationFormStart from '../../../../view/util/manipulationFormStart';
import Listener from '../../listener';
import { IEventUnit } from '../../../../interfaces/interfaces';

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

    const userLocation = sessionStorage.getItem('totoogg-JSFE2023Q4');

    if (userLocation) {
      const userData = JSON.parse(userLocation);
      const user = {
        id: userData.id,
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: userData.login,
            password: userData.password,
          },
        },
      };

      this.server.connectServer(JSON.stringify(user));
    }
  }

  private userLogout(arg: IEventUnit): void {
    if (!arg.payload!.user?.isLogined) {
      this.formStart.startPage();
      sessionStorage.removeItem('totoogg-JSFE2023Q4');
    }
  }
}
