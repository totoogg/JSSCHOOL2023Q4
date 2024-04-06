import StartForm from '../view/startForm/startForm';
import ElementCreation from '../view/util/element-creation';
import ErrorBlock from '../view/errorBlock/errorBlock';
import InfoBlock from '../view/infoBlock/infoBlock';
import { IApp } from '../interfaces/interfaces';
import { errorParams, formParams, infoParams, wrapperParams } from '../view/util/params';

export default class App implements IApp {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ErrorBlock(errorParams);

  private infoBlock = new InfoBlock(infoParams);

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
    );
  }
}
