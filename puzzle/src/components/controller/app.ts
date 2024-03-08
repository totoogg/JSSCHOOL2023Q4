import StartForm from '../view/startForm/startForm';
import HeaderView from '../view/header/headerView';
import { IParams, IApp, IUserSave } from '../interfaces/interfaces';

const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
  action: null,
};

const headerParams: IParams = {
  tag: 'header',
  classNames: ['header', 'display-none'],
  action: null,
};

export default class App implements IApp {
  public start!: StartForm;

  public header!: HeaderView;

  public createPage() {
    if (this.checkUsers()) {
      formParams.classNames?.push('display-none');
      headerParams.classNames?.pop();
    }

    this.header = new HeaderView(headerParams);
    this.start = new StartForm(formParams);

    document.body.append(
      this.start.form.getElement() as HTMLElement,
      this.header.header.getElement() as HTMLElement,
    );
  }

  public checkUsers(): boolean {
    const users = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4');
    let usersArr: IUserSave[] | [];

    if (users) {
      usersArr = JSON.parse(users);
    } else {
      usersArr = [];
    }

    return usersArr.some((el) => el.login);
  }
}
