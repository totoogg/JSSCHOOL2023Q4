import ElementCreation from '../view/util/element-creation';

export interface IHTMLElement {
  getElement(): ElementCreation | null;
  createElements(): void;
}
