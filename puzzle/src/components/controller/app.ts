import StartForm from '../view/startForm/startForm';
import { IParams, IApp } from '../interfaces/interfaces';

const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
  action: null,
};

export default class App implements IApp {
  public start!: StartForm | null;

  createPage() {
    this.start = new StartForm(formParams) as StartForm;

    if (this.start) {
      document.body.append(this.start.form.getElement() as HTMLElement);
    }
  }
}
