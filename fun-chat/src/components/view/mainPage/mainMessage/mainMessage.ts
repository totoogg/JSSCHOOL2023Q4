import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  messagesHeaderParams,
  messagesHeaderNameParams,
  headerStatusParams,
  messagesMainParams,
  messagesFooterParams,
  footerButtonParams,
  actionDeleteParams,
  actionEditParams,
  actionParams,
  footerWrapperInputParams,
  wrapperInputButtonParams,
  wrapperInputParams,
} from '../../util/params';

import './mainMessage.scss';

export default class MainMessage implements IHTMLElement {
  public mainMessage: ElementCreation;

  private header = new ElementCreation(messagesHeaderParams);

  private headerName = new ElementCreation(messagesHeaderNameParams);

  private headerStatus = new ElementCreation(headerStatusParams);

  private main = new ElementCreation(messagesMainParams);

  private footer = new ElementCreation(messagesFooterParams);

  private footerWrapper = new ElementCreation(footerWrapperInputParams);

  private wrapperInput = new ElementCreation(wrapperInputParams);

  private wrapperInputButton = new ElementCreation(wrapperInputButtonParams);

  private footerButton = new ElementCreation(footerButtonParams);

  private action = new ElementCreation(actionParams);

  private edit = new ElementCreation(actionEditParams);

  private delete = new ElementCreation(actionDeleteParams);

  constructor(param: IParams) {
    this.mainMessage = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.mainMessage) {
      return this.mainMessage;
    }
    return null;
  }

  public createElements(): void {
    this.createHeader();
    this.createFooter();
    this.createAction();

    this.mainMessage
      .getElement()!
      .append(
        this.header.getElement()!,
        this.main.getElement()!,
        this.footer.getElement()!,
        this.action.getElement()!,
      );
  }

  private createHeader(): void {
    this.header
      .getElement()!
      .append(this.headerName.getElement()!, this.headerStatus.getElement()!);
  }

  private createFooter(): void {
    const footerInput = this.wrapperInput.getElement()!;

    footerInput.setAttribute('type', 'text');
    footerInput.setAttribute('placeholder', 'Message...');
    footerInput.setAttribute('disabled', 'true');

    const button = this.wrapperInputButton.getElement()!;

    button.append(document.createElement('span'), document.createElement('span'));

    this.footerWrapper.getElement()!.append(footerInput, button);

    this.footer
      .getElement()!
      .append(this.footerWrapper.getElement()!, this.footerButton.getElement()!);
  }

  private createAction(): void {
    this.action.getElement()!.append(this.edit.getElement()!, this.delete.getElement()!);
  }
}
