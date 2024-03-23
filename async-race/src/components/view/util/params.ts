import ButtonRemoveCar from '../../controller/listeners/buttons/controlCar/buttonRemoveCar';
import ButtonSelectCar from '../../controller/listeners/buttons/controlCar/buttonSelectCar';
import ButtonCreateCar from '../../controller/listeners/buttons/form/buttonCreateCar';
import ButtonGenerateCars from '../../controller/listeners/buttons/form/buttonGenerateCars';
import ButtonUpdateCar from '../../controller/listeners/buttons/form/buttonUpdateCar';
import SwitchingGarage from '../../controller/listeners/buttons/garage/switchingGarage';
import ButtonToGarage from '../../controller/listeners/buttons/pages/buttonToGarage';
import ButtonToWinner from '../../controller/listeners/buttons/pages/buttonToWinner';
import InputUpdateColor from '../../controller/listeners/input/inputUpdateColor';
import { IParams } from '../../interfaces/IParams';

export const headerParams: IParams = {
  tag: 'header',
  classNames: ['header'],
};

export const headerGarageParams: IParams = {
  tag: 'button',
  classNames: ['header__garage', 'button', 'disabled'],
  textContent: 'TO GARAGE',
  action: new ButtonToGarage('click'),
};

export const headerWinnerParams: IParams = {
  tag: 'button',
  classNames: ['header__winner', 'button'],
  textContent: 'TO WINNER',
  action: new ButtonToWinner('click'),
};

export const mainParams: IParams = {
  tag: 'main',
  classNames: ['main'],
};

export const mainFormParams: IParams = {
  tag: 'div',
  classNames: ['main__form'],
};

export const formCreateParams: IParams = {
  tag: 'div',
  classNames: ['form__create'],
};

export const createInputParams: IParams = {
  tag: 'input',
  classNames: ['create__text'],
};

export const createColorParams: IParams = {
  tag: 'input',
  classNames: ['create__color'],
};

export const createButtonParams: IParams = {
  tag: 'button',
  classNames: ['create__button', 'button'],
  textContent: 'CREATE',
  action: new ButtonCreateCar('click'),
};

export const formUpdateParams: IParams = {
  tag: 'div',
  classNames: ['form__update'],
};

export const updateInputParams: IParams = {
  tag: 'input',
  classNames: ['update__text', 'disabled'],
};

export const updateColorParams: IParams = {
  tag: 'input',
  classNames: ['update__color', 'disabled'],
  action: new InputUpdateColor('click'),
};

export const updateButtonParams: IParams = {
  tag: 'button',
  classNames: ['update__button', 'button', 'disabled'],
  textContent: 'UPDATE',
  action: new ButtonUpdateCar('click'),
};

export const formButtonsParams: IParams = {
  tag: 'div',
  classNames: ['form__buttons'],
};

export const buttonsRaceParams: IParams = {
  tag: 'button',
  classNames: ['buttons__race', 'button'],
  textContent: 'RACE',
  action: null,
};

export const buttonsResetParams: IParams = {
  tag: 'button',
  classNames: ['buttons__reset', 'button'],
  textContent: 'RESET',
  action: null,
};

export const buttonsGeneratorParams: IParams = {
  tag: 'button',
  classNames: ['buttons__generator-cars', 'button'],
  textContent: 'GENERATE CARS',
  action: new ButtonGenerateCars('click'),
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

export const carLineParams: IParams = {
  tag: 'div',
  classNames: ['cars__line'],
};

export const lineControlParams: IParams = {
  tag: 'div',
  classNames: ['line__control'],
};

export const controlBlockParams: IParams = {
  tag: 'div',
  classNames: ['control__block'],
};

export const blockSelectParams: IParams = {
  tag: 'button',
  classNames: ['block__select', 'button'],
  textContent: 'SELECT',
  action: new ButtonSelectCar('click'),
};

export const blockRemoveParams: IParams = {
  tag: 'button',
  classNames: ['block__remove', 'button'],
  textContent: 'REMOVE',
  action: new ButtonRemoveCar('click'),
};

export const blockTextParams: IParams = {
  tag: 'p',
  classNames: ['block__text'],
};

export const controlCarParams: IParams = {
  tag: 'div',
  classNames: ['control__car'],
};

export const carStartParams: IParams = {
  tag: 'button',
  classNames: ['car__start', 'button'],
  textContent: 'A',
  action: null,
};

export const carStopParams: IParams = {
  tag: 'button',
  classNames: ['car__stop', 'button'],
  textContent: 'B',
  action: null,
};

export const carImageParams: IParams = {
  tag: 'div',
  classNames: ['car__image'],
};

export const lineFinishParams: IParams = {
  tag: 'div',
  classNames: ['line__finish'],
};

export const garageButtonsParams: IParams = {
  tag: 'div',
  classNames: ['garage__buttons'],
};

export const buttonsNextGarageParams: IParams = {
  tag: 'button',
  classNames: ['buttons__next-garage', 'button', 'disabled'],
  textContent: 'NEXT',
  action: new SwitchingGarage('click'),
};

export const buttonsPrevGarageParams: IParams = {
  tag: 'button',
  classNames: ['buttons__prev-garage', 'button', 'disabled'],
  textContent: 'PREV',
  action: new SwitchingGarage('click'),
};

export const mainWinnerParams: IParams = {
  tag: 'div',
  classNames: ['main__winner', 'display-none'],
};

export const winnerTitleParams: IParams = {
  tag: 'h2',
  classNames: ['winner__title'],
  textContent: 'Winners',
};

export const winnerCurrentParams: IParams = {
  tag: 'p',
  classNames: ['winner__current-page'],
  textContent: 'Page #',
};

export const winnerCarsParams: IParams = {
  tag: 'div',
  classNames: ['winner__table'],
};

export const carNumberHeadParams: IParams = {
  tag: 'div',
  classNames: ['table__number-head'],
  textContent: 'Number',
};

export const carColorHeadParams: IParams = {
  tag: 'div',
  classNames: ['table__color-head'],
  textContent: 'Car',
};

export const carNameHeadParams: IParams = {
  tag: 'div',
  classNames: ['table__name-head'],
  textContent: 'Name',
};

export const carWinsHeadParams: IParams = {
  tag: 'div',
  classNames: ['table__wins-head'],
  textContent: 'Wins',
  action: null,
};

export const carTimeHeadParams: IParams = {
  tag: 'div',
  classNames: ['table__time-head'],
  textContent: 'Best time (seconds)',
  action: null,
};

export const carNumberParams: IParams = {
  tag: 'div',
  classNames: ['table__number'],
};

export const carColorParams: IParams = {
  tag: 'div',
  classNames: ['table__color'],
};

export const carNameParams: IParams = {
  tag: 'div',
  classNames: ['table__name'],
};

export const carWinsParams: IParams = {
  tag: 'div',
  classNames: ['table__wins'],
};

export const carTimeParams: IParams = {
  tag: 'div',
  classNames: ['table__time'],
};

export const winnerButtonsParams: IParams = {
  tag: 'div',
  classNames: ['winner__buttons'],
};

export const buttonsNextWinnerParams: IParams = {
  tag: 'button',
  classNames: ['buttons__next-winner', 'button'],
  textContent: 'NEXT',
  action: null,
};

export const buttonsPrevWinnerParams: IParams = {
  tag: 'button',
  classNames: ['buttons__prev-winner', 'button', 'disabled'],
  textContent: 'PREV',
  action: null,
};
