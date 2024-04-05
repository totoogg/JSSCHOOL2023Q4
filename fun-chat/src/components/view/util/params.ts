import { IParams } from '../../interfaces/interfaces';

export const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
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
  action: null,
};

export const formNameErrorParams: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-name', 'visibility'],
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
  action: null,
};

export const formPasswordErrorParams: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-password', 'visibility'],
  textContent: 'Length must be more than 4 characters. Use uppercase and uppercase letters',
};

export const formButtonsParams: IParams = {
  tag: 'div',
  classNames: ['form__buttons'],
};

export const buttonLoginParams: IParams = {
  tag: 'button',
  classNames: ['buttons__login', 'button'],
  textContent: 'Login',
  action: null,
};

export const buttonInfoParams: IParams = {
  tag: 'button',
  classNames: ['buttons__info', 'button'],
  textContent: 'Info',
  action: null,
};
