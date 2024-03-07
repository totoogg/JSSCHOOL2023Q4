import ElementCreation from '../element-creation';
import { IParams, IStartForm, IAction } from '../../../interfaces/interfaces';

import './startForm.scss';

const labelParams: IParams = {
  tag: 'h1',
  classNames: ['form__title'],
  textContent: 'ENGLISH PUZZLE',
  action: null,
};

const inputParamsName: IParams = {
  tag: 'input',
  classNames: ['form__input-name', 'input'],
  action: null,
};

const labelParamsName: IParams = {
  tag: 'label',
  classNames: ['form__label-name', 'label'],
  textContent: 'First Name',
  action: null,
};

const inputParamsSurname: IParams = {
  tag: 'input',
  classNames: ['form__input-name', 'input'],
  action: null,
};

const labelParamsSurname: IParams = {
  tag: 'label',
  classNames: ['form__label-name', 'label'],
  textContent: 'Surname',
  action: null,
};

const buttonParams: IParams = {
  tag: 'button',
  classNames: ['form__button'],
  textContent: 'Login',
  action: null,
};

export default class StartForm implements IStartForm {
  public form: ElementCreation;

  public inputElementName!: IAction | ElementCreation;

  public labelElementName!: ElementCreation;

  public inputElementSurname!: IAction | ElementCreation;

  public labelElementSurname!: ElementCreation;

  public buttonElement!: ElementCreation;

  public title!: ElementCreation;

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
    this.title = new ElementCreation(labelParams);

    this.inputElementName = new ElementCreation(inputParamsName);
    this.inputElementName.getElement()!.setAttribute('id', 'name');

    this.labelElementName = new ElementCreation(labelParamsName);
    this.labelElementName.getElement()!.setAttribute('for', 'name');

    this.inputElementSurname = new ElementCreation(inputParamsSurname);
    this.inputElementSurname.getElement()!.setAttribute('id', 'surname');

    this.labelElementSurname = new ElementCreation(labelParamsSurname);
    this.labelElementSurname.getElement()!.setAttribute('for', 'surname');

    this.buttonElement = new ElementCreation(buttonParams);

    this.form
      .getElement()!
      .append(
        this.title.getElement()!,
        this.labelElementName.getElement()!,
        this.inputElementName.getElement()!,
        this.labelElementSurname.getElement()!,
        this.inputElementSurname.getElement()!,
        this.buttonElement.getElement()!,
      );
  }
}
