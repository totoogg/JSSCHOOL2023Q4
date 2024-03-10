import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { buttonLogoutParams } from '../util/params';

import './headerView.scss';

export default class HeaderView implements IHTMLElement {
  public header: ElementCreation;

  public buttonLogout: ElementCreation = new ElementCreation(buttonLogoutParams);

  constructor(param: IParams) {
    this.header = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.header) {
      return this.header;
    }
    return null;
  }

  public createElements(): void {
    this.header.getElement()?.append(this.buttonLogout.getElement()!);
  }
}
