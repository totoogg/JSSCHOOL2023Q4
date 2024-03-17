import StartForm from '../view/startForm/startForm';
import HeaderView from '../view/header/headerView';
import StartPage from '../view/pages/startPage/startPage';
import MainPage from '../view/pages/mainPage/mainPage';
import { IUserSave } from '../interfaces/interfaces';
import ResultPage from '../view/pages/resultPage/resultPage';
import {
  descriptionParams,
  formParams,
  headerParams,
  mainParams,
  totalParams,
} from '../view/util/params';

export default class App {
  private start: StartForm = new StartForm(formParams);

  private header: HeaderView = new HeaderView(headerParams);

  private description: StartPage = new StartPage(descriptionParams);

  private main: MainPage = new MainPage(mainParams);

  private total: ResultPage = new ResultPage(totalParams);

  public createPage() {
    document.body.append(
      this.header.header.getElement() as HTMLElement,
      this.description.blockDescription.getElement() as HTMLElement,
      this.start.form.getElement() as HTMLElement,
      this.main.main.getElement() as HTMLElement,
      this.total.result.getElement() as HTMLElement,
    );

    if (this.checkUsers()) {
      this.settingName();
      this.start.form.getElement()!.classList.add('display-none');
      this.header.header.getElement()!.classList.remove('display-none');
      this.description.blockDescription.getElement()!.classList.remove('display-none');
      document.body.classList.add('background');
    }
  }

  private checkUsers(): boolean {
    const usersArr: IUserSave[] | [] = this.localData();

    return usersArr.some((el) => el.login);
  }

  private settingName(): void {
    const usersArr: IUserSave[] | [] = this.localData();

    const name = usersArr.find((el) => el.login);

    const greeting = document.querySelector('.description__greeting');

    if (greeting) {
      greeting.textContent = `Hello ${name?.name} ${name?.surname}`;
    }
  }

  private localData(): IUserSave[] | [] {
    const users = localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4');
    let usersArr: IUserSave[] | [];

    if (users) {
      usersArr = JSON.parse(users);
    } else {
      usersArr = [];
    }

    return usersArr;
  }
}
