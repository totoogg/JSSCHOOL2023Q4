import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { infoButtonParams, infoLinkParams, infoTextParams, infoTitleParams } from '../util/params';

import './infoBlock.scss';

export default class InfoBlock implements IHTMLElement {
  public infoBlock: ElementCreation;

  private infoTitle = new ElementCreation(infoTitleParams);

  private infoText = new ElementCreation(infoTextParams);

  private infoLink = new ElementCreation(infoLinkParams);

  private infoButton = new ElementCreation(infoButtonParams);

  constructor(param: IParams) {
    this.infoBlock = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.infoBlock) {
      return this.infoBlock;
    }
    return null;
  }

  public createElements(): void {
    this.addLink();

    this.infoBlock
      .getElement()!
      .append(
        this.infoTitle.getElement()!,
        this.infoText.getElement()!,
        this.infoLink.getElement()!,
        this.infoButton.getElement()!,
      );
  }

  private addLink(): void {
    const link = this.infoLink.getElement()!;
    link.setAttribute('href', 'https://github.com/totoogg');
  }
}
