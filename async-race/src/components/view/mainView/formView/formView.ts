import ElementCreation from '../../util/element-creation';
import { IParams } from '../../../interfaces/IParams';
import {
  buttonsGeneratorParams,
  buttonsRaceParams,
  buttonsResetParams,
  createButtonParams,
  createColorParams,
  createInputParams,
  updateButtonParams,
  updateColorParams,
  updateInputParams,
  formCreateParams,
  formUpdateParams,
  formButtonsParams,
} from '../../util/params';

import './formView.scss';

export default class FormView {
  public form: ElementCreation;

  private createDiv: ElementCreation = new ElementCreation(formCreateParams);

  private updateDiv: ElementCreation = new ElementCreation(formUpdateParams);

  private buttonsDiv: ElementCreation = new ElementCreation(formButtonsParams);

  constructor(param: IParams) {
    this.form = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.form) {
      return this.form;
    }
    return null;
  }

  public createElements(): void {
    this.createInputs();
    this.createButtons();

    this.form
      .getElement()
      ?.append(
        this.createDiv.getElement()!,
        this.updateDiv.getElement()!,
        this.buttonsDiv.getElement()!,
      );
  }

  private createInputs(): void {
    const inputCreateText = new ElementCreation(createInputParams);
    const inputCreateColor = new ElementCreation(createColorParams);
    const inputCreateButton = new ElementCreation(createButtonParams);
    const inputUpdateText = new ElementCreation(updateInputParams);
    const inputUpdateColor = new ElementCreation(updateColorParams);
    const inputUpdateButton = new ElementCreation(updateButtonParams);

    inputCreateColor.getElement()!.setAttribute('type', 'color');
    inputUpdateColor.getElement()!.setAttribute('type', 'color');
    inputUpdateText.getElement()!.setAttribute('readonly', 'true');

    this.createDiv
      .getElement()
      ?.append(
        inputCreateText.getElement()!,
        inputCreateColor.getElement()!,
        inputCreateButton.getElement()!,
      );
    this.updateDiv
      .getElement()
      ?.append(
        inputUpdateText.getElement()!,
        inputUpdateColor.getElement()!,
        inputUpdateButton.getElement()!,
      );
  }

  private createButtons(): void {
    const race = new ElementCreation(buttonsRaceParams);
    const reset = new ElementCreation(buttonsResetParams);
    const generator = new ElementCreation(buttonsGeneratorParams);

    this.buttonsDiv
      .getElement()
      ?.append(race.getElement()!, reset.getElement()!, generator.getElement()!);
  }
}
