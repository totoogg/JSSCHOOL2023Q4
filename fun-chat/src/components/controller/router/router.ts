import ManipulationFormStart from '../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../view/util/manipulationMainUsers';

export default class Router {
  private routes = [
    {
      path: '',
      callback: () => {
        this.startPage();
      },
    },
    {
      path: 'login',
      callback: () => {
        this.startPage();
      },
    },
    {
      path: 'about',
      callback: () => {
        this.infoPage();
      },
    },
    {
      path: 'main',
      callback: () => {
        this.mainPage();
      },
    },
    {
      path: 'error',
      callback: () => {
        this.notFoundPage();
      },
    },
  ];

  private mainUsersThis = new ManipulationMainUsers();

  private formStartThis = new ManipulationFormStart();

  public navigate(str: string | null): void {
    if (typeof str === 'string') {
      this.setHistory(str);
    }

    const urlStart = window.location.pathname;
    let url;

    if (urlStart.startsWith('/totoogg-JSFE2023Q4/fun-chat/prod/')) {
      url = window.location.pathname.slice(34);
    } else {
      url = window.location.pathname.slice(1);
    }

    this.urlChangedHandler(url);
  }

  private setHistory(str: string): void {
    window.history.pushState(null, '', `/${str}`);
  }

  private urlChangedHandler(str: string): void {
    const route = this.routes.find((el) => el.path === str);

    if (!route) {
      const notFound = this.routes.find((el) => el.path === 'error');
      if (notFound) {
        this.navigate(notFound.path);
      }

      return;
    }

    route.callback();
  }

  private startPage(): void {
    const session = sessionStorage.getItem('totoogg-JSFE2023Q4');

    if (session) {
      this.formStartThis.hiddenFormStart();
      this.navigate('main');
    } else {
      this.formStartThis.startPage();
    }
  }

  private mainPage(): void {
    const session = sessionStorage.getItem('totoogg-JSFE2023Q4');

    if (session) {
      const user: {
        login: string;
        password: string;
        isLogin: boolean;
      } = JSON.parse(session);

      this.formStartThis.setNameValue(user.login);
      this.formStartThis.setPasswordValue(user.password);
      this.formStartThis.buttonLogin();
      this.mainUsersThis.showCancelEdit(false);
      this.mainUsersThis.clearInputMessage();
      this.mainUsersThis.activeButtonSendMessage(false);
      this.mainUsersThis.clearMessageEdit();

      if (!user.isLogin) {
        this.mainUsersThis.clearUsers();
        this.mainUsersThis.clearInteractionMessages();
        this.formStartThis.submitForm();
      } else {
        this.formStartThis.showMain();
      }
    } else {
      this.navigate('login');
    }
  }

  private infoPage(): void {
    this.formStartThis.showInfo();
  }

  private notFoundPage(): void {
    this.formStartThis.showNotFound();
  }
}
