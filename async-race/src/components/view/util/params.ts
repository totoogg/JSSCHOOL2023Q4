import { IParams } from '../../interfaces/IParams';

export const headerParams: IParams = {
  tag: 'header',
  classNames: ['header'],
};

export const headerGarageParams: IParams = {
  tag: 'button',
  classNames: ['header__garage', 'button'],
  textContent: 'TO GARAGE',
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
  classNames: ['main__garage', 'display-none'],
};

export const mainWinnerParams: IParams = {
  tag: 'div',
  classNames: ['main__winner', 'display-none'],
};
