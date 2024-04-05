import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import {
  buttonInfoParams,
  buttonLoginParams,
  formButtonsParams,
  formNameErrorParams,
  formNameParams,
  formPasswordErrorParams,
  formPasswordParams,
  formTittleParams,
  nameInputParams,
  nameLabelParams,
  passwordInputParams,
  passwordLabelParams,
} from '../util/params';

import './startForm.scss';

export default class StartForm implements IHTMLElement {
  public form: ElementCreation;

  private title: ElementCreation = new ElementCreation(formTittleParams);

  private blockName: ElementCreation = new ElementCreation(formNameParams);

  private labelName: ElementCreation = new ElementCreation(nameLabelParams);

  private inputName: ElementCreation = new ElementCreation(nameInputParams);

  private errorName: ElementCreation = new ElementCreation(formNameErrorParams);

  private blockPassword: ElementCreation = new ElementCreation(formPasswordParams);

  private labelPassword: ElementCreation = new ElementCreation(passwordLabelParams);

  private inputPassword: ElementCreation = new ElementCreation(passwordInputParams);

  private errorPassword: ElementCreation = new ElementCreation(formPasswordErrorParams);

  private buttonsBlock: ElementCreation = new ElementCreation(formButtonsParams);

  private buttonLogin: ElementCreation = new ElementCreation(buttonLoginParams);

  private buttonInfo: ElementCreation = new ElementCreation(buttonInfoParams);

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
    this.createNameField();
    this.createPasswordField();
    this.createButtonsField();

    this.form
      .getElement()!
      .append(
        this.title.getElement()!,
        this.blockName.getElement()!,
        this.errorName.getElement()!,
        this.blockPassword.getElement()!,
        this.errorPassword.getElement()!,
        this.buttonsBlock.getElement()!,
      );
  }

  private createNameField(): void {
    this.labelName.getElement()!.setAttribute('for', 'name');

    this.inputName.getElement()!.setAttribute('id', 'name');
    this.inputName.getElement()!.setAttribute('required', 'true');

    this.blockName.getElement()!.append(this.labelName.getElement()!, this.inputName.getElement()!);
  }

  private createPasswordField(): void {
    this.labelPassword.getElement()!.setAttribute('for', 'password');

    this.inputPassword.getElement()!.setAttribute('id', 'password');
    this.inputPassword.getElement()!.setAttribute('required', 'true');
    this.inputPassword.getElement()!.setAttribute('type', 'password');

    this.blockPassword
      .getElement()!
      .append(this.labelPassword.getElement()!, this.inputPassword.getElement()!);
  }

  private createButtonsField(): void {
    this.buttonsBlock
      .getElement()!
      .append(this.buttonLogin.getElement()!, this.buttonInfo.getElement()!);
  }
}
