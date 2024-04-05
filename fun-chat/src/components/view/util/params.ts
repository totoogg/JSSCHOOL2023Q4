import ButtonError from '../../controller/listeners/errorPopUp/buttonError';
import ButtonInfo from '../../controller/listeners/startForm/buttonInfo';
import KeyboardStartForm from '../../controller/listeners/startForm/keyboardStartForm';
import SubmitStartForm from '../../controller/listeners/startForm/submitStartForm';
import { IParams } from '../../interfaces/interfaces';

export const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
  action: new SubmitStartForm('submit'),
};

export const formTittleParams: IParams = {
  tag: 'h1',
  classNames: ['form__title'],
  textContent: 'Fun Chat',
};

export const formNameParams: IParams = {
  tag: 'div',
  classNames: ['form__name'],
};

export const nameLabelParams: IParams = {
  tag: 'label',
  classNames: ['name__label'],
  textContent: 'Name',
};

export const nameInputParams: IParams = {
  tag: 'input',
  classNames: ['name__input'],
  action: new KeyboardStartForm('keyup'),
};

export const formNameErrorParams: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-name'],
  textContent: 'The name field requires at least 4 characters',
};

export const formPasswordParams: IParams = {
  tag: 'div',
  classNames: ['form__password'],
};

export const passwordLabelParams: IParams = {
  tag: 'label',
  classNames: ['password__label'],
  textContent: 'Password',
};

export const passwordInputParams: IParams = {
  tag: 'input',
  classNames: ['password__input'],
  action: new KeyboardStartForm('keyup'),
};

export const formPasswordErrorParams: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-password'],
  textContent: 'Length must be more than 4 characters. Use uppercase and lowercase letters',
};

export const formButtonsParams: IParams = {
  tag: 'div',
  classNames: ['form__buttons'],
};

export const buttonLoginParams: IParams = {
  tag: 'button',
  classNames: ['buttons__login', 'button', 'disable'],
  textContent: 'Login',
};

export const buttonInfoParams: IParams = {
  tag: 'button',
  classNames: ['buttons__info', 'button'],
  textContent: 'Info',
  action: new ButtonInfo('click'),
};

export const wrapperParams: IParams = {
  tag: 'div',
  classNames: ['wrapper', 'display-none'],
};

export const errorParams: IParams = {
  tag: 'div',
  classNames: ['error', 'display-none'],
};

export const errorTextParams: IParams = {
  tag: 'p',
  classNames: ['error__text'],
};

export const errorButtonParams: IParams = {
  tag: 'button',
  classNames: ['error__button', 'button'],
  textContent: 'Ok',
  action: new ButtonError('click'),
};
