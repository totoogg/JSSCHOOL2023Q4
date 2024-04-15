import ButtonError from '../../controller/listeners/errorPopUp/buttonError';
import ButtonInfoBack from '../../controller/listeners/infoPopUp/buttonInfoBack';
import ButtonLogout from '../../controller/listeners/mainPage/header/buttonLogout';
import KeyboardMessage from '../../controller/listeners/mainPage/main/massage/keyboardMessage';
import ScrollMessage from '../../controller/listeners/mainPage/main/massage/scrollMessages';
import SubmitMessage from '../../controller/listeners/mainPage/main/massage/submitMessage';
import ClickUser from '../../controller/listeners/mainPage/main/users/clickUser';
import InputSearch from '../../controller/listeners/mainPage/main/users/inputSearch';
import ButtonInfo from '../../controller/listeners/startForm/buttonInfo';
import KeyboardStartForm from '../../controller/listeners/startForm/keyboardStartForm';
import SubmitStartForm from '../../controller/listeners/startForm/submitStartForm';
import { IParams } from '../../interfaces/interfaces';
import MouseOverMessages from '../../controller/listeners/mainPage/main/massage/mouseOverMessages';
import ContextMenuMessage from '../../controller/listeners/mainPage/main/massage/contextMenuMessage';
import DeleteMessage from '../../controller/listeners/mainPage/main/massage/deleteMessege';
import EditMessage from '../../controller/listeners/mainPage/main/massage/editMessege';
import CancelEdit from '../../controller/listeners/mainPage/main/massage/cancelEdit';

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
  textContent:
    'The name field requires at least 4 characters of the English alphabet or numbers, without gaps',
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
  textContent:
    'Length must be more than 4 characters. Use uppercase and lowercase letters English alphabet or numbers, without gaps',
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

export const errorLossParams: IParams = {
  tag: 'div',
  classNames: ['error__loss', 'display-none'],
};

export const errorLossImgParams: IParams = {
  tag: 'div',
  classNames: ['loss__img'],
};

export const errorLossTextParams: IParams = {
  tag: 'p',
  classNames: ['loss__text'],
  textContent: 'Connection to the server',
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

export const infoParams: IParams = {
  tag: 'div',
  classNames: ['info', 'display-none'],
};

export const infoTitleParams: IParams = {
  tag: 'h2',
  classNames: ['info__title'],
  textContent: 'Fun Chat',
};

export const infoTextParams: IParams = {
  tag: 'p',
  classNames: ['info__text'],
  textContent:
    'What could be better than chatting with friends using a chat app? On your own server.',
};

export const infoLinkParams: IParams = {
  tag: 'a',
  classNames: ['info__link'],
  textContent: 'Author Vladimir Goncharov',
};

export const infoButtonParams: IParams = {
  tag: 'button',
  classNames: ['info__button', 'button'],
  textContent: 'Come back',
  action: new ButtonInfoBack('click'),
};

export const headerParams: IParams = {
  tag: 'div',
  classNames: ['main__header'],
};

export const headerUserParams: IParams = {
  tag: 'p',
  classNames: ['header__user'],
  textContent: 'User: ',
};

export const headerNameParams: IParams = {
  tag: 'h2',
  classNames: ['header__name'],
  textContent: 'Fun Chat',
};

export const headerButtonsParams: IParams = {
  tag: 'div',
  classNames: ['header__buttons'],
};

export const headerLogoutParams: IParams = {
  tag: 'button',
  classNames: ['buttons__logout', 'button'],
  textContent: 'Logout',
  action: new ButtonLogout('click'),
};

export const mainParams: IParams = {
  tag: 'div',
  classNames: ['main', 'display-none'],
};

export const mainInteractionParams: IParams = {
  tag: 'div',
  classNames: ['main__interaction'],
};

export const interactionUsersParams: IParams = {
  tag: 'div',
  classNames: ['interaction__users'],
};

export const usersSearchParams: IParams = {
  tag: 'input',
  classNames: ['users__search'],
  action: new InputSearch('keyup'),
};

export const usersContentParams: IParams = {
  tag: 'div',
  classNames: ['users__content'],
  action: new ClickUser('click'),
};

export const userAuthenticationParams: IParams = {
  tag: 'div',
  classNames: ['content__user'],
};

export const userAuthenticationStatusParams: IParams = {
  tag: 'div',
  classNames: ['user__status'],
};

export const userAuthenticationNameParams: IParams = {
  tag: 'p',
  classNames: ['user__name'],
};

export const userAuthenticationMessageParams: IParams = {
  tag: 'div',
  classNames: ['user__count-message'],
};

export const interactionMessagesParams: IParams = {
  tag: 'div',
  classNames: ['interaction__messages'],
};

export const messagesHeaderParams: IParams = {
  tag: 'div',
  classNames: ['messages__header'],
};

export const messagesHeaderNameParams: IParams = {
  tag: 'p',
  classNames: ['header__name-user'],
};

export const headerStatusParams: IParams = {
  tag: 'p',
  classNames: ['header__status-user', 'offline'],
};

export const messagesMainParams: IParams = {
  tag: 'div',
  classNames: ['messages__main', 'start'],
  textContent: 'Select a user to send a message...',
  action: [
    new ScrollMessage('wheel'),
    new ScrollMessage('mousedown'),
    new ContextMenuMessage('mousedown'),
    new MouseOverMessages('mouseenter'),
    new MouseOverMessages('mouseleave'),
    new MouseOverMessages('mousemove'),
    new ContextMenuMessage('contextmenu'),
  ],
};

export const messageStripParams: IParams = {
  tag: 'div',
  classNames: ['strip'],
};

export const stripLeftParams: IParams = {
  tag: 'div',
  classNames: ['strip__left'],
};

export const stripCenterParams: IParams = {
  tag: 'p',
  classNames: ['strip__center'],
  textContent: 'New message',
};

export const stripRightParams: IParams = {
  tag: 'div',
  classNames: ['strip__right'],
};

export const messagesParams: IParams = {
  tag: 'div',
  classNames: ['message'],
};

export const messageHeaderParams: IParams = {
  tag: 'div',
  classNames: ['message__header'],
};

export const messageHeaderSenderParams: IParams = {
  tag: 'p',
  classNames: ['header__message-sender'],
};

export const messageHeaderTimeParams: IParams = {
  tag: 'p',
  classNames: ['message__message-time'],
};

export const messageMainParams: IParams = {
  tag: 'p',
  classNames: ['message__main'],
};

export const messageFooterParams: IParams = {
  tag: 'div',
  classNames: ['message__footer'],
};

export const messageFooterChangeParams: IParams = {
  tag: 'p',
  classNames: ['footer__message-change'],
};

export const messageFooterStatusParams: IParams = {
  tag: 'p',
  classNames: ['footer__message-status'],
};

export const actionParams: IParams = {
  tag: 'div',
  classNames: ['action', 'display-none'],
};
export const actionEditParams: IParams = {
  tag: 'div',
  classNames: ['action__edit'],
  textContent: 'Edit',
  action: new EditMessage('click'),
};
export const actionDeleteParams: IParams = {
  tag: 'div',
  classNames: ['action__delete'],
  textContent: 'Delete',
  action: new DeleteMessage('click'),
};

export const messagesFooterParams: IParams = {
  tag: 'form',
  classNames: ['messages__footer'],
  action: new SubmitMessage('submit'),
};

export const footerWrapperInputParams: IParams = {
  tag: 'div',
  classNames: ['footer__wrapper'],
};

export const wrapperInputParams: IParams = {
  tag: 'input',
  classNames: ['wrapper__message-input'],
  action: new KeyboardMessage('keyup'),
};

export const wrapperInputButtonParams: IParams = {
  tag: 'div',
  classNames: ['wrapper__button', 'display-none'],
  action: new CancelEdit('click'),
};

export const footerButtonParams: IParams = {
  tag: 'button',
  classNames: ['footer__message-button', 'button', 'disable'],
  textContent: 'Send',
};

export const footerParams: IParams = {
  tag: 'div',
  classNames: ['main__footer'],
};

export const footerSchoolLinkParams: IParams = {
  tag: 'a',
  classNames: ['footer__school-link'],
};

export const footerSchoolLogoParams: IParams = {
  tag: 'div',
  classNames: ['school-link__logo'],
};

export const footerNameParams: IParams = {
  tag: 'a',
  classNames: ['footer__author'],
  textContent: 'Vladimir Goncharov',
};

export const footerYearParams: IParams = {
  tag: 'p',
  classNames: ['footer__year'],
  textContent: '2024',
};
