import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { notFoundTitleParams, notFoundTextParams } from '../util/params';

import './notFound.scss';

export default class NotFound implements IHTMLElement {
  public notFoundPage: ElementCreation;

  private title = new ElementCreation(notFoundTitleParams);

  private text = new ElementCreation(notFoundTextParams);

  constructor(param: IParams) {
    this.notFoundPage = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.notFoundPage) {
      return this.notFoundPage;
    }
    return null;
  }

  public createElements(): void {
    this.notFoundPage.getElement()!.append(this.title.getElement()!, this.text.getElement()!);
  }
}
