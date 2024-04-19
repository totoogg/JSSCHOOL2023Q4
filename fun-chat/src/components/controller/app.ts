import StartForm from '../view/startForm/startForm';
import ElementCreation from '../view/util/element-creation';
import ErrorBlock from '../view/errorBlock/errorBlock';
import InfoBlock from '../view/infoBlock/infoBlock';
import MainPage from '../view/mainPage/main';
import NotFound from '../view/notFound/notFound';
import ManipulationMainUsers from '../view/util/manipulationMainUsers';
import Router from './router/router';
import {
  errorParams,
  formParams,
  infoParams,
  mainParams,
  notFoundParams,
  wrapperParams,
} from '../view/util/params';
import { IApp } from '../interfaces/interfaces';

export default class App implements IApp {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ErrorBlock(errorParams);

  private infoBlock = new InfoBlock(infoParams);

  private main = new MainPage(mainParams);

  private notFound = new NotFound(notFoundParams);

  private mainUsersThis = new ManipulationMainUsers();

  private router = new Router();

  public createPage(): void {
    document.addEventListener('click', () => {
      this.mainUsersThis.showActionMessage(false);
      this.mainUsersThis.writeIdActionMessage('');
    });

    document.body.append(
      this.errorBlock.errorBlock.getElement()!,
      this.wrapper.getElement()!,
      this.infoBlock.infoBlock.getElement()!,
      this.start.form.getElement()!,
      this.main.mainPage.getElement()!,
      this.notFound.notFoundPage.getElement()!,
    );

    document.addEventListener('DOMContentLoaded', () => {
      this.router.navigate(null);
    });

    window.addEventListener('popstate', () => {
      this.router.navigate(null);
    });
  }
}
