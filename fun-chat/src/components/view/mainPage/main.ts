import ElementCreation from '../util/element-creation';
import MainFooter from './mainFooter/mainFooter';
import MainHeader from './mainHeader/mainHeader';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import {
  footerParams,
  headerParams,
  interactionMessagesParams,
  interactionUsersParams,
  mainInteractionParams,
} from '../util/params';

import './main.scss';

export default class MainPage implements IHTMLElement {
  public mainPage: ElementCreation;

  private header = new MainHeader(headerParams);

  private main = new ElementCreation(mainInteractionParams);

  private users = new ElementCreation(interactionUsersParams);

  private massages = new ElementCreation(interactionMessagesParams);

  private footer = new MainFooter(footerParams);

  constructor(param: IParams) {
    this.mainPage = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.mainPage) {
      return this.mainPage;
    }
    return null;
  }

  public createElements(): void {
    this.createInteraction();

    this.mainPage
      .getElement()!
      .append(
        this.header.mainHeader.getElement()!,
        this.main.getElement()!,
        this.footer.mainFooter.getElement()!,
      );
  }

  private createInteraction(): void {
    this.main.getElement()!.append(this.users.getElement()!, this.massages.getElement()!);
  }
}
