import WebSocketConnect from '../../../../../model/webSocketConnect';
import ManipulationFormStart from '../../../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IEventUnit } from '../../../../../interfaces/interfaces';

export default class InputSearch extends Listener {
  public eventListener: string;

  private mainUsers = new ManipulationMainUsers();

  private formStart = new ManipulationFormStart();

  private server = new WebSocketConnect();

  constructor(key: string) {
    super();
    this.eventListener = key;
    this.server.on('USER_EXTERNAL_LOGIN', this.userExternalLogin.bind(this));
    this.server.on('USER_EXTERNAL_LOGOUT', this.userExternalLogout.bind(this));
  }

  public callback(): void {
    this.checkUsers();
  }

  private userExternalLogin(arg: IEventUnit): void {
    const { user } = arg.payload!;

    this.formStart.addUser({ status: user!.isLogined!, name: user!.login, count: 0 });
    this.mainUsers.sortUsers();
    this.checkUsers();
  }

  private userExternalLogout(arg: IEventUnit): void {
    const { user } = arg.payload!;

    this.mainUsers.changeUserStatusOffline(user!.login);
    this.mainUsers.sortUsers();
    this.checkUsers();
  }

  private checkUsers(): void {
    const search = this.mainUsers.getSearchUser();
    const users = this.mainUsers.getUsers();
    const needUsers = users.filter((el) => el?.includes(search));

    this.mainUsers.showUsers(needUsers);
  }
}
