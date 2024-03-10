import ElementCreation from '../../util/element-creation';
import { IMainPage, IParams } from '../../../interfaces/interfaces';
import {
  buttonContinueParams,
  fieldButtonsParams,
  fieldClickParams,
  fieldResultParams,
  fieldTotalParams,
  lineResultParams,
  lineTotalParams,
} from '../../util/params';

import './mainPage.scss';

export default class MainPage implements IMainPage {
  public main: ElementCreation;

  public fieldResult: ElementCreation = new ElementCreation(fieldResultParams);

  public fieldClick: ElementCreation = new ElementCreation(fieldClickParams);

  public fieldTotal: ElementCreation = new ElementCreation(fieldTotalParams);

  public fieldButtons: ElementCreation = new ElementCreation(fieldButtonsParams);

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
    this.createButtons();

    this.main
      .getElement()
      ?.append(
        this.fieldResult.getElement()!,
        this.fieldTotal.getElement()!,
        this.fieldClick.getElement()!,
        this.fieldButtons.getElement()!,
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

  public createButtons(): void {
    const continueButton = new ElementCreation(buttonContinueParams);

    this.fieldButtons.getElement()?.append(continueButton.getElement()!);
  }
}
