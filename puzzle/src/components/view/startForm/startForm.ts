import ElementCreation from '../util/element-creation';
import ButtonLogin from '../../controller/listener/button/buttonLogin';
import InputStart from '../../controller/listener/input/inputStart';
import { IParams, IStartForm } from '../../interfaces/interfaces';

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
  action: new InputStart('blur'),
};

const labelParamsName: IParams = {
  tag: 'label',
  classNames: ['form__label-name', 'label'],
  textContent: 'First Name',
  action: null,
};

const inputParamsSurname: IParams = {
  tag: 'input',
  classNames: ['form__input-surname', 'input'],
  action: new InputStart('blur'),
};

const labelParamsSurname: IParams = {
  tag: 'label',
  classNames: ['form__label-surname', 'label'],
  textContent: 'Surname',
  action: null,
};

const buttonParams: IParams = {
  tag: 'button',
  classNames: ['form__button', 'button', 'disable'],
  textContent: 'Login',
  action: new ButtonLogin('click'),
};

const divErrorName: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-name'],
  textContent: 'The name field requires at least 3 characters',
  action: null,
};

const divErrorSurname: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-surname'],
  textContent: 'The surname field requires at least 4 characters',
  action: null,
};

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
