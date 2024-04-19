import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import {
  errorButtonParams,
  errorLossImgParams,
  errorLossParams,
  errorLossTextParams,
  errorTextParams,
} from '../util/params';

import './errorBlock.scss';

export default class ErrorBlock implements IHTMLElement {
  public errorBlock: ElementCreation;

  private errorText = new ElementCreation(errorTextParams);

  private errorBottom = new ElementCreation(errorButtonParams);

  private loss = new ElementCreation(errorLossParams);

  private lossImg = new ElementCreation(errorLossImgParams);

  private lossText = new ElementCreation(errorLossTextParams);

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
    this.createLoss();

    this.errorBlock
      .getElement()!
      .append(
        this.errorText.getElement()!,
        this.errorBottom.getElement()!,
        this.loss.getElement()!,
      );
  }

  private createLoss(): void {
    this.loss.getElement()!.append(this.lossImg.getElement()!, this.lossText.getElement()!);
  }
}
