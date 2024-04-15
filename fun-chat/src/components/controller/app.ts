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
import ManipulationFormStart from '../view/util/manipulationFormStart';

export default class App {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ErrorBlock(errorParams);

  private infoBlock = new InfoBlock(infoParams);

  private main = new MainPage(mainParams);

  private mainUsersThis = new ManipulationMainUsers();

  private formStartThis = new ManipulationFormStart();

  public createPage(): void {
    console.log(window.location.href);

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
    );

    document.addEventListener('DOMContentLoaded', () => {
      const session = sessionStorage.getItem('totoogg-JSFE2023Q4');
      const page = sessionStorage.getItem('pageInfoTotoogg-JSFE2023Q4');

      if (session) {
        this.formStartThis.hiddenFormStart();
      }

      if (page) {
        this.formStartThis.showInfo();
      }

      console.log(1);
    });
  }
}
