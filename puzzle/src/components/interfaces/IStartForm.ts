import ElementCreation from '../view/util/element-creation';

export interface IStartForm {
  getElement(): ElementCreation | null;
  createElements(): void;
  setAtt(): void;
}
