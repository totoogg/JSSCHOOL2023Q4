import WebSocketConnect from '../../../model/webSocketConnect';
import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import { IEventUnit } from '../../../interfaces/interfaces';

export default class SubmitStartForm extends Listener {
  public eventListener: string;

  private formStart = new ManipulationFormStart();

  private mainUsers = new ManipulationMainUsers();

  private server = new WebSocketConnect();

  constructor(key: string) {
    super();
    this.eventListener = key;
    this.addUnitEvent();
  }

  public callback(event: Event): void {
    event.preventDefault();

    if (!this.formStart.checkButton()) {
      const usersInactive: IEventUnit = {
        id: String(Date.now()),
        type: 'USER_INACTIVE',
        payload: null,
      };
      const usersActive: IEventUnit = {
        id: String(Date.now()),
        type: 'USER_ACTIVE',
        payload: null,
      };
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
      this.server.connectServer(JSON.stringify(usersActive));
      this.server.connectServer(JSON.stringify(usersInactive));
    }
  }

  private addUnitEvent(): void {
    this.server.on('USER_LOGIN', this.userLogin.bind(this));
    this.server.on('ERROR', this.userShowError.bind(this));
    this.server.on('USER_ACTIVE', this.usersActive.bind(this));
    this.server.on('USER_INACTIVE', this.usersInactive.bind(this));
  }

  private userLogin(arg: IEventUnit): void {
    const user = {
      id: String(arg.id),
      login: this.formStart.getNameValue(),
      password: this.formStart.getPasswordValue(),
    };

    sessionStorage.setItem('totoogg-JSFE2023Q4', JSON.stringify(user));

    this.formStart.hiddenFormStart();
    this.formStart.showMain();
  }

  private userShowError(arg: IEventUnit): void {
    this.formStart.showError(arg.payload!.error!);
  }

  private usersActive(arg: IEventUnit): void {
    const { users } = arg.payload!;
    const login = this.formStart.getNameValue();

    if (users!.length > 0) {
      users?.forEach((el) => {
        if (el.login !== login) {
          this.formStart.addUser({ status: el.isLogined!, name: el.login, count: 0 });
        }
      });
    }
    this.mainUsers.sortUsers();
  }

  private usersInactive(arg: IEventUnit): void {
    const { users } = arg.payload!;
    if (users!.length > 0) {
      users?.forEach((el) => {
        this.formStart.addUser({ status: el.isLogined!, name: el.login, count: 0 });
      });
    }
    this.mainUsers.sortUsers();
  }
}
