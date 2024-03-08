import ButtonLogout from '../../controller/listener/button/buttonLogout';
import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';

import './headerView.scss';

const buttonParams: IParams = {
  tag: 'button',
  classNames: ['header__button', 'button'],
  textContent: 'Logout',
  action: new ButtonLogout('click'),
};

export default class HeaderView implements IHTMLElement {
  public header: ElementCreation;

  public buttonLogout!: ElementCreation;

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
    this.buttonLogout = new ElementCreation(buttonParams);

    this.header.getElement()?.append(this.buttonLogout.getElement()!);
  }
}
