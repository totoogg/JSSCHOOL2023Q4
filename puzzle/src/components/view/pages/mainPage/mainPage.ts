import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  buttonContinueParams,
  buttonResultParams,
  buttonSolutionParams,
  fieldButtonsParams,
  fieldClickParams,
  fieldHelpParams,
  fieldResultParams,
  fieldTotalParams,
  lineResultParams,
  lineTotalParams,
  soundButtonParams,
  textHelpParams,
} from '../../util/params';

import './mainPage.scss';

export default class MainPage implements IHTMLElement {
  public main: ElementCreation;

  private fieldResult: ElementCreation = new ElementCreation(fieldResultParams);

  private fieldClick: ElementCreation = new ElementCreation(fieldClickParams);

  private fieldTotal: ElementCreation = new ElementCreation(fieldTotalParams);

  private fieldButtons: ElementCreation = new ElementCreation(fieldButtonsParams);

  private fieldHelp: ElementCreation = new ElementCreation(fieldHelpParams);

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
    this.createHelp();

    this.main
      .getElement()
      ?.append(
        this.fieldHelp.getElement()!,
        this.fieldResult.getElement()!,
        this.fieldTotal.getElement()!,
        this.fieldClick.getElement()!,
        this.fieldButtons.getElement()!,
      );
  }

  private createLine(): void {
    const elementTotal = new ElementCreation(lineTotalParams);
    const elementResult = new ElementCreation(lineResultParams);

    for (let index = 0; index < 10; index += 1) {
      const copyElementTotal = elementTotal.getElement()!.cloneNode(true);
      this.fieldTotal.getElement()?.append(copyElementTotal);
      const copyElementResult = elementResult.getElement()!.cloneNode(true);
      this.fieldResult.getElement()?.append(copyElementResult);
    }
  }

  private createButtons(): void {
    const continueButton = new ElementCreation(buttonContinueParams);
    const solutionButton = new ElementCreation(buttonSolutionParams);
    const resultButton = new ElementCreation(buttonResultParams);

    this.fieldButtons
      .getElement()
      ?.append(
        solutionButton.getElement()!,
        continueButton.getElement()!,
        resultButton.getElement()!,
      );
  }

  private createHelp(): void {
    const soundButton = new ElementCreation(soundButtonParams);
    const textHelp = new ElementCreation(textHelpParams);

    this.fieldHelp.getElement()?.append(soundButton.getElement()!, textHelp.getElement()!);
  }
}
