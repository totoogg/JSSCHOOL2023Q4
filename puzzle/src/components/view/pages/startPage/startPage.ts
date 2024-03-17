import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  buttonStartParams,
  descriptionTextParams,
  greetingParams,
  titleParams,
} from '../../util/params';

import './startPage.scss';

export default class StartPage implements IHTMLElement {
  public blockDescription: ElementCreation;

  private buttonStart: ElementCreation = new ElementCreation(buttonStartParams);

  private titleStart: ElementCreation = new ElementCreation(titleParams);

  private textStart: ElementCreation = new ElementCreation(descriptionTextParams);

  private greeting: ElementCreation = new ElementCreation(greetingParams);

  constructor(param: IParams) {
    this.blockDescription = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.blockDescription) {
      return this.blockDescription;
    }
    return null;
  }

  public createElements(): void {
    this.blockDescription
      .getElement()
      ?.append(
        this.greeting.getElement()!,
        this.titleStart.getElement()!,
        this.textStart.getElement()!,
        this.buttonStart.getElement()!,
      );
  }
}
