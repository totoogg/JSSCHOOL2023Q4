import { IEventUnit } from '../../interfaces/IEventUnit';
import WebSocketConnect from '../../model/webSocketConnect';
import ManipulationFormStart from '../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../view/util/manipulationMainUsers';
import Unit from './unit';
import UnitListeners from './unitListeners';

export default class WorkWithServer extends UnitListeners {
  private server = new WebSocketConnect();

  private formStart = new ManipulationFormStart();

  private mainUsers = new ManipulationMainUsers();

  private unit = new Unit();

  constructor() {
    super();
    this.addUnitEvent();
  }

  private addUnitEvent(): void {
    this.on('ERROR', this.userShowError.bind(this));
    this.on('USER_LOGIN', this.userLogin.bind(this));
    this.on('USER_LOGOUT', this.userLogout.bind(this));
    this.on('USER_ACTIVE', this.usersActive.bind(this));
    this.on('USER_INACTIVE', this.usersInactive.bind(this));
    this.on('USER_EXTERNAL_LOGIN', this.userExternalLogin.bind(this));
    this.on('USER_EXTERNAL_LOGOUT', this.userExternalLogout.bind(this));
    this.on('MSG_SEND', this.messageSend.bind(this));
  }

  public sendServerData(data: IEventUnit): void {
    this.server.connectServer(JSON.stringify(data));
  }

  private userLogout(arg: IEventUnit): void {
    if (!arg.payload!.user?.isLogined) {
      this.formStart.startPage();
      sessionStorage.removeItem('totoogg-JSFE2023Q4');
    }
  }

  private userLogin(arg: IEventUnit): void {
    const user = {
      id: String(arg.id),
      login: this.formStart.getNameValue(),
      password: this.formStart.getPasswordValue(),
    };

    sessionStorage.setItem('totoogg-JSFE2023Q4', JSON.stringify(user));

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

    this.sendServerData(usersActive);
    this.sendServerData(usersInactive);

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
  }

  private messageSend(arg: IEventUnit): void {
    const message = arg.payload?.message;
    const time = new Date(message!.datetime!);
    const timeStr = `${String(time.getDate()).padStart(2, '0')}.${String(time.getMonth() + 1).padStart(2, '0')}.${time.getFullYear()}, ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;

    console.log(message);

    this.mainUsers.addMessage('You', message!.to!, message!.text, timeStr, String(message!.id!));
  }
}
