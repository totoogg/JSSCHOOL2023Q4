import StartForm from '../view/startForm/startForm';
import ElementCreation from '../view/util/element-creation';
import ErrorBlock from '../view/errorBlock/errorBlock';
import InfoBlock from '../view/infoBlock/infoBlock';
import MainPage from '../view/mainPage/main';
import {
  errorParams,
  formParams,
  infoParams,
  mainParams,
  wrapperParams,
} from '../view/util/params';
import ManipulationMainUsers from '../view/util/manipulationMainUsers';

export default class App {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ErrorBlock(errorParams);

  private infoBlock = new InfoBlock(infoParams);

  private main = new MainPage(mainParams);

  private mainUsersThis = new ManipulationMainUsers();

  public createPage(): void {
    console.log(window.location.href);
    document.addEventListener('DOMContentLoaded', () => {
      console.log(1);
    });

    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target.classList.contains('action')) {
        this.mainUsersThis.showActionMessage(false);
        this.mainUsersThis.writeIdActionMessage('');
      }
    });

    document.body.append(
      this.errorBlock.errorBlock.getElement()!,
      this.wrapper.getElement()!,
      this.infoBlock.infoBlock.getElement()!,
      this.start.form.getElement()!,
      this.main.mainPage.getElement()!,
    );
  }
}
