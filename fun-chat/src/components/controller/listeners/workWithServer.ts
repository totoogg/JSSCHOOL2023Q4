import WebSocketConnect from '../../model/webSocketConnect';
import ManipulationFormStart from '../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../view/util/manipulationMainUsers';
import Router from '../router/router';
import Unit from './unit';
import UnitListeners from './unitListeners';
import { IWorkWithServer, IEventUnit } from '../../interfaces/interfaces';

export default class WorkWithServer extends UnitListeners implements IWorkWithServer {
  private server = new WebSocketConnect();

  private formStart = new ManipulationFormStart();

  private mainUsers = new ManipulationMainUsers();

  private unit = new Unit();

  private router = new Router();

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
    this.on('MSG_DELIVER', this.messageDelivered.bind(this));
    this.on('MSG_READ', this.messageReaded.bind(this));
    this.on('MSG_DELETE', this.messageDelete.bind(this));
    this.on('MSG_EDIT', this.messageEdit.bind(this));
    this.on('OPEN', this.openConnect.bind(this));
    this.on('CLOSE', this.closeConnect.bind(this));
  }

  public sendServerData(data: IEventUnit): void {
    this.server.connectServer(JSON.stringify(data));
  }

  public openConnect(data: IEventUnit): void {
    const session = sessionStorage.getItem('totoogg-JSFE2023Q4');
    const url = window.location.hash.slice(1);

    if (session) {
      const user = JSON.parse(session);

      const userSave = {
        login: user.login,
        password: user.password,
        isLogin: false,
      };

      sessionStorage.setItem('totoogg-JSFE2023Q4', JSON.stringify(userSave));
    }

    if (session && data.type === 'OPEN' && url !== 'about' && url !== 'error') {
      this.router.navigate('main');
    } else {
      this.router.navigate(url);
    }

    this.formStart.showErrorConnect(false);
  }

  public closeConnect(data: IEventUnit): void {
    if (data.type === 'CLOSE') {
      sessionStorage.removeItem('selectUserTotoogg-JSFE2023Q4');
      this.formStart.showErrorConnect(true);
      this.mainUsers.clearUsers();
      this.mainUsers.clearInteractionMessages();
      this.mainUsers.showCancelEdit(false);
      this.mainUsers.clearInputMessage();
      this.mainUsers.activeButtonSendMessage(false);
      this.mainUsers.clearMessageEdit();
    }
  }

  private userLogout(arg: IEventUnit): void {
    if (!arg.payload!.user?.isLogined) {
      sessionStorage.setItem('pageTotoogg-JSFE2023Q4', 'login');
      sessionStorage.removeItem('totoogg-JSFE2023Q4');
      sessionStorage.removeItem('selectUserTotoogg-JSFE2023Q4');
      this.router.navigate('login');
    }
  }

  private userLogin(arg: IEventUnit): void {
    if (arg.payload?.user?.login) {
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

      sessionStorage.setItem('pageTotoogg-JSFE2023Q4', 'main');
      this.router.navigate('main');

      this.formStart.showMain();
      this.sendServerData(usersActive);
      this.sendServerData(usersInactive);
      this.formStart.hiddenFormStart();
    }
  }

  private userShowError(arg: IEventUnit): void {
    this.formStart.showError(arg.payload!.error!);
  }

  private authenticationUsers(arg: IEventUnit): void {
    const { users } = arg.payload!;
    const login = this.formStart.getNameValue();
    const selectUser = sessionStorage.getItem('selectUserTotoogg-JSFE2023Q4');

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

          if (selectUser && selectUser === el.login) {
            let name = selectUser;
            let fullName = null;

            if (selectUser.length > 10) {
              name = `${selectUser.slice(0, 10)}...`;
              fullName = selectUser;
            }

            this.mainUsers.selectUser(el.isLogined!, name, fullName);
          }

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

  private messageDelivered(arg: IEventUnit): void {
    const { message } = arg.payload!;

    this.mainUsers.updateSentMessage(message!.id!, message!.status!.isDelivered);
  }

  private messageReaded(arg: IEventUnit): void {
    const { message } = arg.payload!;

    this.mainUsers.updateReadedMessage(message!.id!, message!.status!.isReaded);
  }

  private messageSend(arg: IEventUnit): void {
    const message = arg.payload?.message;
    const timeStr = this.getTime(message!.datetime!);
    const userFrom = this.mainUsers.getUserFromSend();
    const userTo = this.mainUsers.getUserToSend();

    if (userTo) {
      if (message?.from === userFrom) {
        this.mainUsers.addMessage(
          'You',
          message!.text!,
          timeStr,
          String(message!.id!),
          message.status!,
        );
      }
      if (message?.from === userTo) {
        if (!this.mainUsers.checkDividingStrip()) {
          this.mainUsers.addDividingStrip();
        }

        this.mainUsers.addMessage(
          message!.from!,
          message!.text!,
          timeStr,
          String(message!.id!),
          message.status!,
        );
      }
    }

    this.mainUsers.updateMessageScrolling();
    this.mainUsers.updateCountMessages(message!.from!);
  }

  private messagesFromUser(arg: IEventUnit): void {
    const { messages } = arg.payload!;
    const user = this.mainUsers.getUserFromSend();
    const userMessage = this.mainUsers.getUserToSend();
    const userFrom = messages?.find((el) => el.from !== user);
    const notReade = messages?.filter((el) => !el.status?.isReaded && el.from !== user).length;

    if (notReade) {
      this.mainUsers.updateCountMessages(userFrom!.from!, notReade);
    }

    if (
      userMessage &&
      messages!.length > 0 &&
      (userMessage === messages![0].to || userMessage === messages![0].from) &&
      (user === messages![0].to || user === messages![0].from)
    ) {
      messages?.forEach((el) => {
        if (!this.mainUsers.checkIdMessages(el.id!)) {
          const status = el.status!;
          const timeStr = this.getTime(el.datetime!);

          if (el.from === user) {
            this.mainUsers.addMessage('You', el!.text, timeStr, String(el!.id!), status);
          } else {
            if (!el.status?.isReaded && !this.mainUsers.checkDividingStrip()) {
              this.mainUsers.addDividingStrip();
            }

            this.mainUsers.addMessage(el.from!, el!.text, timeStr, String(el!.id!), status);
          }
        }
      });

      this.mainUsers.updateMessageScrolling();
    }
  }

  private messageDelete(arg: IEventUnit): void {
    const { message } = arg.payload!;

    if (message?.status?.isDeleted) {
      this.mainUsers.messageDelete(message.id!);

      this.mainUsers.checkCountMessages();
      this.mainUsers.clearUsers();

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
    }
  }

  private messageEdit(arg: IEventUnit): void {
    const { message } = arg.payload!;

    if (message?.status?.isEdited) {
      this.mainUsers.messageEdit(message.id!, message.text!);
    }
  }

  private getTime(num: number): string {
    const time = new Date(num);

    return `${String(time.getDate()).padStart(2, '0')}.${String(time.getMonth() + 1).padStart(2, '0')}.${time.getFullYear()}, ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
  }
}
