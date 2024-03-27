import ElementCreation from '../view/util/element-creation';
import { IGetDataCar, IHTMLElement } from './interfaces';

export interface IGarageView extends IHTMLElement {
  garage: ElementCreation;
  updateText(count: number, current: number): void;
  createLineCar(car: IGetDataCar): void;
  setImageCar(color: string): string;
}
