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

  public buttonStart: ElementCreation = new ElementCreation(buttonStartParams);

  public titleStart: ElementCreation = new ElementCreation(titleParams);

  public textStart: ElementCreation = new ElementCreation(descriptionTextParams);

  public greeting: ElementCreation = new ElementCreation(greetingParams);

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
