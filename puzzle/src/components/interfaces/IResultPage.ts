import ElementCreation from '../view/util/element-creation';

export interface IResultPage {
  getElement(): ElementCreation | null;
  createElements(): void;
  createDescription(): void;
  createResult(): void;
}
