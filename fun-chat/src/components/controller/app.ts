import StartForm from '../view/startForm/startForm';
import { IApp } from '../interfaces/interfaces';
import { formParams } from '../view/util/params';

export default class App implements IApp {
  private start: StartForm = new StartForm(formParams);

  public createPage(): void {
    console.log(window.location.href);
    document.addEventListener('DOMContentLoaded', () => {
      console.log(1);
    });
    document.body.append(this.start.form.getElement()!);
  }
}
