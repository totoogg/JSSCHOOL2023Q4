import ElementCreation from '../../../../util/element-creation';
import { IHTMLElement, IParams } from '../../../../../interfaces/interfaces';
import { stripLeftParams, stripCenterParams, stripRightParams } from '../../../../util/params';

import './dividingStrip.scss';

export default class DividingStrip implements IHTMLElement {
  public strip: ElementCreation;

  private left = new ElementCreation(stripLeftParams);

  private center = new ElementCreation(stripCenterParams);

  private right = new ElementCreation(stripRightParams);

  constructor(param: IParams) {
    this.strip = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.strip) {
      return this.strip;
    }
    return null;
  }

  public createElements(): void {
    this.strip
      .getElement()!
      .append(this.left.getElement()!, this.center.getElement()!, this.right.getElement()!);
  }
}
