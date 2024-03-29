import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { headerGarageParams, headerWinnerParams } from '../util/params';

import './headerView.scss';

export default class HeaderView implements IHTMLElement {
  public header: ElementCreation;

  private buttonGarage: ElementCreation = new ElementCreation(headerGarageParams);

  private buttonWinner: ElementCreation = new ElementCreation(headerWinnerParams);

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
    this.header
      .getElement()
      ?.append(this.buttonGarage.getElement()!, this.buttonWinner.getElement()!);
  }
}
