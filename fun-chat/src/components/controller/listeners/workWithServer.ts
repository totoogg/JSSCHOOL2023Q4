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
    this.on('USER_ACTIVE', this.authenticationUsers.bind(this));
    this.on('USER_INACTIVE', this.authenticationUsers.bind(this));
    this.on('USER_EXTERNAL_LOGIN', this.userExternalLogin.bind(this));
    this.on('USER_EXTERNAL_LOGOUT', this.userExternalLogout.bind(this));
    this.on('MSG_SEND', this.messageSend.bind(this));
    this.on('MSG_FROM_USER', this.messagesFromUser.bind(this));
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

  private authenticationUsers(arg: IEventUnit): void {
    const { users } = arg.payload!;
    const login = this.formStart.getNameValue();

    if (users!.length > 0) {
      users?.forEach((el) => {
        if (el.login !== login) {
          const messages: IEventUnit = {
            id: String(Date.now()),
            type: 'MSG_FROM_USER',
            payload: {
              user: {
                login: el.login,
              },
            },
          };

          this.sendServerData(messages);

          this.formStart.addUser({ status: el.isLogined!, name: el.login, count: 0 });
        }
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
    const timeStr = this.getTime(message!.datetime!);
    const userFrom = this.mainUsers.getUserFromSend();
    const userTo = this.mainUsers.getUserToSend();

    if (userTo) {
      if (message?.from === userFrom) {
        this.mainUsers.addMessage('You', message!.text, timeStr, String(message!.id!));
      }
      if (message?.from === userTo) {
        if (!this.mainUsers.checkDividingStrip()) {
          this.mainUsers.addDividingStrip();
        }

        this.mainUsers.addMessage(message!.from!, message!.text, timeStr, String(message!.id!));
        this.mainUsers.updateMessageScrolling();
      }
    }

    this.mainUsers.updateCountMessages(message!.from!);
  }

  private messagesFromUser(arg: IEventUnit): void {
    const { messages } = arg.payload!;
    const user = this.mainUsers.getUserFromSend();
    const userMessage = this.mainUsers.getUserToSend();
    const userFrom = messages?.find((el) => el.from !== user);
    const notReade = messages?.filter((el) => !el.status?.isReaded && el.from !== user).length;

    if (userFrom) {
      this.mainUsers.updateCountMessages(userFrom!.from!, notReade);
    }

    if (userMessage && messages!.length > 0) {
      messages?.forEach((el) => {
        const timeStr = this.getTime(el.datetime!);

        if (el.from === user) {
          this.mainUsers.addMessage('You', el!.text, timeStr, String(el!.id!));
        } else {
          if (!el.status?.isReaded && !this.mainUsers.checkDividingStrip()) {
            this.mainUsers.addDividingStrip();
          }

          this.mainUsers.addMessage(el.to, el!.text, timeStr, String(el!.id!));
        }
      });

      this.mainUsers.updateMessageScrolling();
    }
  }

  private getTime(num: number): string {
    const time = new Date(num);

    return `${String(time.getDate()).padStart(2, '0')}.${String(time.getMonth() + 1).padStart(2, '0')}.${time.getFullYear()}, ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
  }
}
