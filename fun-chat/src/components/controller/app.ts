import StartForm from '../view/startForm/startForm';
import ElementCreation from '../view/util/element-creation';
import { IApp } from '../interfaces/interfaces';
import {
  errorButtonParams,
  errorParams,
  errorTextParams,
  formParams,
  wrapperParams,
} from '../view/util/params';

export default class App implements IApp {
  private start = new StartForm(formParams);

  private wrapper = new ElementCreation(wrapperParams);

  private errorBlock = new ElementCreation(errorParams);

  private errorText = new ElementCreation(errorTextParams);

  private errorBottom = new ElementCreation(errorButtonParams);

  public createPage(): void {
    this.createErrorField();
    console.log(window.location.href);
    document.addEventListener('DOMContentLoaded', () => {
      console.log(1);
    });
    document.body.append(
      this.errorBlock.getElement()!,
      this.wrapper.getElement()!,
      this.start.form.getElement()!,
    );
  }

  private createErrorField(): void {
    this.errorBlock
      .getElement()!
      .append(this.errorText.getElement()!, this.errorBottom.getElement()!);
  }
}
