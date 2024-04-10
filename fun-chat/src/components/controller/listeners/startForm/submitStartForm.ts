import WebSocketConnect from '../../../model/webSocketConnect';
import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import Unit from '../unit';
import { IEventUnit } from '../../../interfaces/interfaces';
import Listener from '../listener';

export default class SubmitStartForm extends Listener {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private mainUsersThis = new ManipulationMainUsers();

  private serverThis = new WebSocketConnect();

  private unitThis = new Unit();

  constructor(key: string) {
    super();
    this.eventListener = key;
    // this.addUnitEvent();
  }

  public callback(event: Event): void {
    event.preventDefault();

    if (!this.formStartThis.checkButton()) {
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
            login: this.formStartThis.getNameValue(),
            password: this.formStartThis.getPasswordValue(),
          },
        },
      };

      this.sendServerData(user);
      this.sendServerData(usersActive);
      this.sendServerData(usersInactive);
      /* this.server.connectServer(JSON.stringify(user));
      this.server.connectServer(JSON.stringify(usersActive));
      this.server.connectServer(JSON.stringify(usersInactive)); */
    }
  }

  /* private addUnitEvent(): void {
    this.server.on('USER_LOGIN', this.userLogin.bind(this));
    this.server.on('ERROR', this.userShowError.bind(this));
    this.server.on('USER_ACTIVE', this.usersActive.bind(this));
    this.server.on('USER_INACTIVE', this.usersInactive.bind(this));
    this.server.on('USER_EXTERNAL_LOGIN', this.userExternalLogin.bind(this));
    this.server.on('USER_EXTERNAL_LOGOUT', this.userExternalLogout.bind(this));
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

  private userExternalLogin(arg: IEventUnit): void {
    const { user } = arg.payload!;

    if (!this.mainUsers.checkUser(user!.login)) {
      this.formStart.addUser({ status: user!.isLogined!, name: user!.login, count: 0 });
    } else {
      this.mainUsers.updateStatusUser(user!.login);
    }

    this.mainUsers.sortUsers();
    this.mainUsers.updateUserMessage(user!.login, true);
    this.unit.checkUsers();
  }

  private userExternalLogout(arg: IEventUnit): void {
    const { user } = arg.payload!;

    this.mainUsers.changeUserStatusOffline(user!.login);
    this.mainUsers.sortUsers();
    this.mainUsers.updateUserMessage(user!.login, false);
    this.unit.checkUsers();
  } */
}
