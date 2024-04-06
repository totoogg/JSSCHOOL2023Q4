import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { errorButtonParams, errorTextParams } from '../util/params';

import './errorBlock.scss';

export default class ErrorBlock implements IHTMLElement {
  public errorBlock: ElementCreation;

  private errorText = new ElementCreation(errorTextParams);

  private errorBottom = new ElementCreation(errorButtonParams);

  constructor(param: IParams) {
    this.errorBlock = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.errorBlock) {
      return this.errorBlock;
    }
    return null;
  }

  public createElements(): void {
    this.errorBlock
      .getElement()!
      .append(this.errorText.getElement()!, this.errorBottom.getElement()!);
  }
}
