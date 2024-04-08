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
import Work from './listeners/workWithServer';

export default class App {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ErrorBlock(errorParams);

  private infoBlock = new InfoBlock(infoParams);

  private main = new MainPage(mainParams);

  private server = new Work();

  public createPage(): void {
    console.log(window.location.href);
    document.addEventListener('DOMContentLoaded', () => {
      console.log(1);
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
