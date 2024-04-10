import ElementCreation from '../../../util/element-creation';
import { IHTMLElement, IParams } from '../../../../interfaces/interfaces';
import {
  messageHeaderParams,
  messageHeaderSenderParams,
  messageHeaderTimeParams,
  messageMainParams,
  messageFooterParams,
  messageFooterChangeParams,
  messageFooterStatusParams,
} from '../../../util/params';

import './message.scss';

export default class Message implements IHTMLElement {
  public message: ElementCreation;

  private header = new ElementCreation(messageHeaderParams);

  private sender = new ElementCreation(messageHeaderSenderParams);

  private time = new ElementCreation(messageHeaderTimeParams);

  private main = new ElementCreation(messageMainParams);

  private footer = new ElementCreation(messageFooterParams);

  private change = new ElementCreation(messageFooterChangeParams);

  private status = new ElementCreation(messageFooterStatusParams);

  private mailer: string;

  private timeSend: string;

  private text: string;

  constructor(param: IParams, mailer: string, text: string, timeSend: string) {
    this.mailer = mailer;
    this.text = text;
    this.timeSend = timeSend;
    this.message = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.message) {
      return this.message;
    }
    return null;
  }

  public createElements(): void {
    this.createHeader();
    this.createFooter();

    this.main.setText(this.text);

    this.message
      .getElement()!
      .append(this.header.getElement()!, this.main.getElement()!, this.footer.getElement()!);
  }

  private createHeader(): void {
    this.sender.setText(this.mailer);
    this.time.setText(this.timeSend);

    this.header.getElement()!.append(this.sender.getElement()!, this.time.getElement()!);
  }

  private createFooter(): void {
    this.footer.getElement()!.append(this.change.getElement()!, this.status.getElement()!);
  }
}
