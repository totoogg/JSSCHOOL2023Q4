import StartForm from '../view/startForm/startForm';
import HeaderView from '../view/header/headerView';
import StartPage from '../view/pages/startPage/startPage';
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

const descriptionParams: IParams = {
  tag: 'div',
  classNames: ['description', 'display-none'],
  action: null,
};

export default class App implements IApp {
  public start: StartForm = new StartForm(formParams);

  public header: HeaderView = new HeaderView(headerParams);

  public description: StartPage = new StartPage(descriptionParams);

  public createPage() {
    if (this.checkUsers()) {
      this.start.form.getElement()!.classList.add('display-none');
      this.header.header.getElement()!.classList.remove('display-none');
      this.description.blockDescription.getElement()!.classList.remove('display-none');
      document.body.classList.add('background');
    }

    document.body.append(
      this.header.header.getElement() as HTMLElement,
      this.description.blockDescription.getElement() as HTMLElement,
      this.start.form.getElement() as HTMLElement,
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
