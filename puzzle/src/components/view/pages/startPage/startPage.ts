import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';

import './startPage.scss';

const titleParams: IParams = {
  tag: 'h2',
  classNames: ['description__title'],
  textContent: 'ENGLISH PUZZLE',
  action: null,
};

const descriptionParams: IParams = {
  tag: 'p',
  classNames: ['description__text'],
  textContent:
    'Click on words, collect phases. Words can be drag and drop. Select tooltips in the menu',
  action: null,
};

const greetingParams: IParams = {
  tag: 'p',
  classNames: ['description__greeting'],
  textContent: '',
  action: null,
};

const buttonParams: IParams = {
  tag: 'button',
  classNames: ['description__button', 'button'],
  textContent: 'Start Game',
  action: null, // new ButtonLogout('click')
};

export default class StartPage implements IHTMLElement {
  public blockDescription: ElementCreation;

  public buttonStart: ElementCreation = new ElementCreation(buttonParams);

  public titleStart: ElementCreation = new ElementCreation(titleParams);

  public textStart: ElementCreation = new ElementCreation(descriptionParams);

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
