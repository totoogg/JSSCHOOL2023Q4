import ElementCreation from '../util/element-creation';
import { IParams, IStartForm } from '../../interfaces/interfaces';
import {
  buttonParams,
  divErrorName,
  divErrorSurname,
  inputParamsName,
  inputParamsSurname,
  labelParams,
  labelParamsName,
  labelParamsSurname,
} from '../util/params';

import './startForm.scss';

export default class StartForm implements IStartForm {
  public form: ElementCreation;

  public inputElementName: ElementCreation = new ElementCreation(inputParamsName);

  public labelElementName: ElementCreation = new ElementCreation(labelParamsName);

  public inputElementSurname: ElementCreation = new ElementCreation(inputParamsSurname);

  public labelElementSurname: ElementCreation = new ElementCreation(labelParamsSurname);

  public buttonElement: ElementCreation = new ElementCreation(buttonParams);

  public title: ElementCreation = new ElementCreation(labelParams);

  public errorElementName: ElementCreation = new ElementCreation(divErrorName);

  public errorElementSurname: ElementCreation = new ElementCreation(divErrorSurname);

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
    this.setAtt();

    this.form
      .getElement()!
      .append(
        this.title.getElement()!,
        this.labelElementName.getElement()!,
        this.inputElementName.getElement()!,
        this.errorElementName.getElement()!,
        this.labelElementSurname.getElement()!,
        this.inputElementSurname.getElement()!,
        this.errorElementSurname.getElement()!,
        this.buttonElement.getElement()!,
      );
  }

  public setAtt(): void {
    this.inputElementName.getElement()!.setAttribute('id', 'name');
    this.inputElementName.getElement()!.setAttribute('required', 'true');

    this.labelElementName.getElement()!.setAttribute('for', 'name');

    this.inputElementSurname.getElement()!.setAttribute('id', 'surname');
    this.inputElementSurname.getElement()!.setAttribute('required', 'true');

    this.labelElementSurname.getElement()!.setAttribute('for', 'surname');
  }
}
