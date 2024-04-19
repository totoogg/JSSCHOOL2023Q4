import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  headerUserParams,
  headerNameParams,
  headerButtonsParams,
  headerLogoutParams,
  buttonInfoParams,
} from '../../util/params';

import './mainHeader.scss';

export default class MainHeader implements IHTMLElement {
  public mainHeader: ElementCreation;

  private user = new ElementCreation(headerUserParams);

  private name = new ElementCreation(headerNameParams);

  private buttons = new ElementCreation(headerButtonsParams);

  private logout = new ElementCreation(headerLogoutParams);

  private info = new ElementCreation(buttonInfoParams);

  constructor(param: IParams) {
    this.mainHeader = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.mainHeader) {
      return this.mainHeader;
    }
    return null;
  }

  public createElements(): void {
    this.createButtons();

    this.mainHeader
      .getElement()!
      .append(this.user.getElement()!, this.name.getElement()!, this.buttons.getElement()!);
  }

  private createButtons(): void {
    this.buttons.getElement()!.append(this.info.getElement()!, this.logout.getElement()!);
  }
}
