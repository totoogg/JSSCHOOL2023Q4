import ClickBlock from '../../controller/listener/button/clickBlock';
import ButtonCheckContinue from '../../controller/listener/button/buttonCheckContinue';
import ButtonLogin from '../../controller/listener/button/buttonLogin';
import ButtonLogout from '../../controller/listener/button/buttonLogout';
import ButtonSolution from '../../controller/listener/button/buttonSolution';
import ButtonStart from '../../controller/listener/button/buttonStart';
import InputStart from '../../controller/listener/input/inputStart';
import { IParams } from '../../interfaces/interfaces';
import DragDrop from '../../controller/listener/dragDrop/dragDrop';
import TextHelpButton from '../../controller/listener/button/buttonsHelp/textHelpButton';
import SoundHelpButton from '../../controller/listener/button/buttonsHelp/soundHelp';
import ImageHelpButton from '../../controller/listener/button/buttonsHelp/imageHelp';
import SelectBlock from '../../controller/listener/select/selectBlock';
import ButtonResult from '../../controller/listener/button/buttonResult';
import ButtonTotalContinue from '../../controller/listener/button/buttonTotalContinue';

export const labelParams: IParams = {
  tag: 'h1',
  classNames: ['form__title'],
  textContent: 'ENGLISH PUZZLE',
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
};

export const divErrorSurname: IParams = {
  tag: 'div',
  classNames: ['form__error', 'error-surname'],
  textContent: 'The surname field requires at least 4 characters',
};

export const titleParams: IParams = {
  tag: 'h2',
  classNames: ['description__title'],
  textContent: 'ENGLISH PUZZLE',
};

export const descriptionTextParams: IParams = {
  tag: 'p',
  classNames: ['description__text'],
  textContent:
    'Click on words, collect phases. Words can be drag and drop. Select tooltips in the menu',
};

export const greetingParams: IParams = {
  tag: 'p',
  classNames: ['description__greeting'],
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
  action: [new DragDrop('dragstart'), new DragDrop('dragend'), new DragDrop('dragover')],
};

export const fieldClickParams: IParams = {
  tag: 'div',
  classNames: ['main__field-click'],
  action: [new DragDrop('dragstart'), new DragDrop('dragend'), new DragDrop('dragover')],
};

export const fieldTotalParams: IParams = {
  tag: 'div',
  classNames: ['main__field-total'],
};

export const fieldButtonsParams: IParams = {
  tag: 'div',
  classNames: ['main__field-buttons'],
};

export const fieldHelpParams: IParams = {
  tag: 'div',
  classNames: ['main__field-help'],
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

export const buttonResultParams: IParams = {
  tag: 'button',
  classNames: ['field-buttons__result', 'button', 'display-none'],
  textContent: `Result`,
  action: new ButtonResult('click'),
};

export const lineTotalParams: IParams = {
  tag: 'div',
  classNames: ['field-total__line'],
};

export const lineResultParams: IParams = {
  tag: 'div',
  classNames: ['field-result__line'],
};

export const buttonLogoutParams: IParams = {
  tag: 'button',
  classNames: ['header__button', 'button'],
  textContent: 'Logout',
  action: new ButtonLogout('click'),
};

export const blocksHelpParams: IParams = {
  tag: 'div',
  classNames: ['header__block-help', 'display-none'],
};

export const formParams: IParams = {
  tag: 'form',
  classNames: ['form'],
};

export const headerParams: IParams = {
  tag: 'header',
  classNames: ['header', 'display-none'],
};

export const descriptionParams: IParams = {
  tag: 'div',
  classNames: ['description', 'display-none'],
};

export const mainParams: IParams = {
  tag: 'main',
  classNames: ['main', 'display-none'],
};

export const blockClickParams: IParams = {
  tag: 'div',
  classNames: ['field-click__block'],

  action: [new ClickBlock('mouseup')],
};

export const blockParams: IParams = {
  tag: 'div',
  classNames: ['line__block'],
};

export const soundButtonParams: IParams = {
  tag: 'div',
  classNames: ['field-help__sound-help', 'hide'],
  action: new SoundHelpButton('click'),
};

export const textHelpParams: IParams = {
  tag: 'p',
  classNames: ['field-help__text-help', 'hide'],
};

export const textHelpButtonParams: IParams = {
  tag: 'button',
  classNames: ['text-help__text', 'button-help'],
  action: new TextHelpButton('click'),
};

export const soundHelpButtonParams: IParams = {
  tag: 'button',
  classNames: ['text-help__sound', 'button-help'],

  action: new SoundHelpButton('click'),
};

export const imageHelpButtonParams: IParams = {
  tag: 'button',
  classNames: ['text-help__image', 'button-help'],
  action: new ImageHelpButton('click'),
};

export const selectBlockParams: IParams = {
  tag: 'div',
  classNames: ['header__select-block', 'display-none'],
};

export const selectLevelParams: IParams = {
  tag: 'div',
  classNames: ['select-block__level'],
};

export const selectLevelTextParams: IParams = {
  tag: 'p',
  classNames: ['level__text'],
  textContent: 'Level',
};

export const selectLevelChoiceParams: IParams = {
  tag: 'select',
  classNames: ['level__choice'],

  action: new SelectBlock('change'),
};

export const selectLevelOptionParams: IParams = {
  tag: 'option',
  classNames: ['choice__option'],
};

export const selectPageParams: IParams = {
  tag: 'div',
  classNames: ['select-block__page'],
};

export const selectPageTextParams: IParams = {
  tag: 'p',
  classNames: ['page__text'],
  textContent: 'Page',
};

export const selectPageChoiceParams: IParams = {
  tag: 'select',
  classNames: ['page__choice'],
  action: new SelectBlock('change'),
};

export const selectPageOptionParams: IParams = {
  tag: 'option',
  classNames: ['choice__option'],
};

export const totalParams: IParams = {
  tag: 'div',
  classNames: ['total', 'display-none'],
};

export const totalDescriptionParams: IParams = {
  tag: 'div',
  classNames: ['total__description'],
};

export const descriptionImageParams: IParams = {
  tag: 'div',
  classNames: ['description__image'],
};

export const descriptionTextTotalParams: IParams = {
  tag: 'p',
  classNames: ['description__text'],
};

export const totalResultParams: IParams = {
  tag: 'div',
  classNames: ['total__result'],
};

export const notKnowTitleParams: IParams = {
  tag: 'p',
  classNames: ['result__not-know-title'],
  textContent: `I don't know`,
};

export const totalKnowParams: IParams = {
  tag: 'div',
  classNames: ['result__know'],
};

export const knowTitleParams: IParams = {
  tag: 'p',
  classNames: ['result__know-title'],
  textContent: 'I know',
};

export const totalNotKnowParams: IParams = {
  tag: 'div',
  classNames: ['result__not-know'],
};

export const buttonTotalParams: IParams = {
  tag: 'button',
  classNames: ['total__button', 'button'],
  textContent: 'Continue',
  action: new ButtonTotalContinue('click'),
};
