import ElementCreation from '../../util/element-creation';
import { IMainPage, IParams } from '../../../interfaces/interfaces';

import './mainPage.scss';

const fieldResultParams: IParams = {
  tag: 'div',
  classNames: ['main__field-result'],
  textContent: '',
  action: null,
};

const fieldClickParams: IParams = {
  tag: 'div',
  classNames: ['main__field-click'],
  textContent: '',
  action: null,
};

const fieldTotalParams: IParams = {
  tag: 'div',
  classNames: ['main__field-total'],
  textContent: '',
  action: null,
};

const lineTotalParams: IParams = {
  tag: 'div',
  classNames: ['field-total__line'],
  textContent: '',
  action: null,
};

const lineResultParams: IParams = {
  tag: 'div',
  classNames: ['field-result__line'],
  textContent: '',
  action: null,
};

export default class MainPage implements IMainPage {
  public main: ElementCreation;

  public fieldResult: ElementCreation = new ElementCreation(fieldResultParams);

  public fieldClick: ElementCreation = new ElementCreation(fieldClickParams);

  public fieldTotal: ElementCreation = new ElementCreation(fieldTotalParams);

  constructor(param: IParams) {
    this.main = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.main) {
      return this.main;
    }
    return null;
  }

  public createElements(): void {
    this.createLine();

    this.main
      .getElement()
      ?.append(
        this.fieldResult.getElement()!,
        this.fieldTotal.getElement()!,
        this.fieldClick.getElement()!,
      );
  }

  public createLine(): void {
    for (let index = 0; index < 10; index += 1) {
      const elementTotal = new ElementCreation(lineTotalParams);
      this.fieldTotal.getElement()?.append(elementTotal.getElement()!);

      const elementResult = new ElementCreation(lineResultParams);
      this.fieldResult.getElement()?.append(elementResult.getElement()!);
    }
  }
}
