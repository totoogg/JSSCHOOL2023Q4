import { IParams } from '../../interfaces/IParams';

export const headerParams: IParams = {
  tag: 'header',
  classNames: ['header'],
};

export const headerGarageParams: IParams = {
  tag: 'button',
  classNames: ['header__garage', 'button'],
  textContent: 'TO GARAGE',
  action: null,
};

export const headerWinnerParams: IParams = {
  tag: 'button',
  classNames: ['header__winner', 'button'],
  textContent: 'TO WINNER',
  action: null,
};

export const mainParams: IParams = {
  tag: 'main',
  classNames: ['main'],
};

export const mainFormParams: IParams = {
  tag: 'div',
  classNames: ['main__form'],
};

export const mainGarageParams: IParams = {
  tag: 'div',
  classNames: ['main__garage'],
};

export const garageTitleParams: IParams = {
  tag: 'h1',
  classNames: ['garage__title'],
  textContent: 'Garage',
};

export const garageCurrentParams: IParams = {
  tag: 'p',
  classNames: ['garage__current-page'],
  textContent: 'Page #',
};

export const garageCarsParams: IParams = {
  tag: 'div',
  classNames: ['garage__cars'],
};

export const carBlockParams: IParams = {
  tag: 'div',
  classNames: ['cars__block'],
};

export const garageButtonsParams: IParams = {
  tag: 'div',
  classNames: ['garage__buttons'],
};

export const buttonsNextGarageParams: IParams = {
  tag: 'button',
  classNames: ['buttons__next-garage', 'button'],
  textContent: 'NEXT',
  action: null,
};

export const buttonsPrevGarageParams: IParams = {
  tag: 'button',
  classNames: ['buttons__prev-garage', 'button', 'disabled'],
  textContent: 'PREV',
  action: null,
};

export const mainWinnerParams: IParams = {
  tag: 'div',
  classNames: ['main__winner', 'display-none'],
};
