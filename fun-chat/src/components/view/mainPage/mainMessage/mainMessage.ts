import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  messagesHeaderParams,
  messagesHeaderNameParams,
  headerStatusParams,
  messagesMainParams,
  messagesFooterParams,
  footerButtonParams,
  footerInputParams,
  actionDeleteParams,
  actionEditParams,
  actionParams,
} from '../../util/params';

import './mainMessage.scss';

export default class MainMessage implements IHTMLElement {
  public mainMessage: ElementCreation;

  private header = new ElementCreation(messagesHeaderParams);

  private headerName = new ElementCreation(messagesHeaderNameParams);

  private headerStatus = new ElementCreation(headerStatusParams);

  private main = new ElementCreation(messagesMainParams);

  private footer = new ElementCreation(messagesFooterParams);

  private footerInput = new ElementCreation(footerInputParams);

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
    const footerInput = this.footerInput.getElement()!;

    footerInput.setAttribute('type', 'text');
    footerInput.setAttribute('placeholder', 'Message...');
    footerInput.setAttribute('disabled', 'true');

    this.footer.getElement()!.append(footerInput, this.footerButton.getElement()!);
  }

  private createAction(): void {
    this.action.getElement()!.append(this.edit.getElement()!, this.delete.getElement()!);
  }
}
