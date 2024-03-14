import ClickBlock from '../../controller/listener/button/clickBlock';
import ButtonCheckContinue from '../../controller/listener/button/buttonCheckContinue';
import ButtonLogin from '../../controller/listener/button/buttonLogin';
import ButtonLogout from '../../controller/listener/button/buttonLogout';
import ButtonSolution from '../../controller/listener/button/buttonSolution';
import ButtonStart from '../../controller/listener/button/buttonStart';
import InputStart from '../../controller/listener/input/inputStart';
import { IParams } from '../../interfaces/interfaces';
import DragDrop from '../../controller/listener/dragDrop/dragDrop';

export const labelParams: IParams = {
  tag: 'h1',
  classNames: ['form__title'],
  textContent: 'ENGLISH PUZZLE',
  action: null,
};

export const inputParamsName: IParams = {
  tag: 'input',
  classNames: ['form__input-name', 'input'],
  action: new InputStart('blur'),
};

export const labelParamsName: IParams = {
  tag: 'label',
  classNames: ['form__label-name', 'label'],
  textContent: 'First Name',
  action: null,
};

export const inputParamsSurname: IParams = {
  tag: 'input',
  classNames: ['form__input-surname', 'input'],
  action: new InputStart('blur'),
};

export const labelParamsSurname: IParams = {
  tag: 'label',
  classNames: ['form__label-surname', 'label'],
  textContent: 'Surname',
  action: null,
};

export const buttonParams: IParams = {
  tag: 'button',
  classNames: ['form__button', 'button', 'disable'],
  textContent: 'Login',
  action: new ButtonLogin('click'),
};

export const divErrorName: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-name'],
  textContent: 'The name field requires at least 3 characters',
  action: null,
};

export const divErrorSurname: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-surname'],
  textContent: 'The surname field requires at least 4 characters',
  action: null,
};

export const titleParams: IParams = {
  tag: 'h2',
  classNames: ['description__title'],
  textContent: 'ENGLISH PUZZLE',
  action: null,
};

export const descriptionTextParams: IParams = {
  tag: 'p',
  classNames: ['description__text'],
  textContent:
    'Click on words, collect phases. Words can be drag and drop. Select tooltips in the menu',
  action: null,
};

export const greetingParams: IParams = {
  tag: 'p',
  classNames: ['description__greeting'],
  textContent: '',
  action: null,
};

export const buttonStartParams: IParams = {
  tag: 'button',
  classNames: ['description__button', 'button'],
  textContent: 'Start Game',
  action: new ButtonStart('click'),
};

export const fieldResultParams: IParams = {
  tag: 'div',
  classNames: ['main__field-result'],
  textContent: '',
  action: [new DragDrop('dragstart'), new DragDrop('dragend'), new DragDrop('dragover')],
};

export const fieldClickParams: IParams = {
  tag: 'div',
  classNames: ['main__field-click'],
  textContent: '',
  action: [new DragDrop('dragstart'), new DragDrop('dragend'), new DragDrop('dragover')],
};

export const fieldTotalParams: IParams = {
  tag: 'div',
  classNames: ['main__field-total'],
  textContent: '',
  action: null,
};

export const fieldButtonsParams: IParams = {
  tag: 'div',
  classNames: ['main__field-buttons'],
  textContent: '',
  action: null,
};

export const fieldHelpParams: IParams = {
  tag: 'div',
  classNames: ['main__field-help'],
  textContent: '',
  action: null,
};

export const buttonContinueParams: IParams = {
  tag: 'button',
  classNames: ['field-buttons__check-continue', 'button', 'display-none'],
  textContent: 'Check',
  action: new ButtonCheckContinue('click'),
};

export const buttonSolutionParams: IParams = {
  tag: 'button',
  classNames: ['field-buttons__solution', 'button'],
  textContent: `I don't know`,
  action: new ButtonSolution('click'),
};

export const lineTotalParams: IParams = {
  tag: 'div',
  classNames: ['field-total__line'],
  textContent: '',
  action: null,
};

export const lineResultParams: IParams = {
  tag: 'div',
  classNames: ['field-result__line'],
  textContent: '',
  action: null,
};

export const buttonLogoutParams: IParams = {
  tag: 'button',
  classNames: ['header__button', 'button'],
  textContent: 'Logout',
  action: new ButtonLogout('click'),
};

export const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
  action: null,
};

export const headerParams: IParams = {
  tag: 'header',
  classNames: ['header', 'display-none'],
  action: null,
};

export const descriptionParams: IParams = {
  tag: 'div',
  classNames: ['description', 'display-none'],
  action: null,
};

export const mainParams: IParams = {
  tag: 'main',
  classNames: ['main', 'display-none'],
  action: null,
};

export const blockClickParams: IParams = {
  tag: 'div',
  classNames: ['field-click__block'],
  textContent: '',
  action: [new ClickBlock('mouseup')],
};

export const blockParams: IParams = {
  tag: 'div',
  classNames: ['line__block'],
  textContent: '',
  action: null,
};

export const soundButtonParams: IParams = {
  tag: 'div',
  classNames: ['field-help__sound-help'],
  textContent: '',
  action: null,
};

export const textHelpParams: IParams = {
  tag: 'p',
  classNames: ['field-help__text-help'],
  textContent: '',
  action: null,
};
