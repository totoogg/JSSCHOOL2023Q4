import ElementCreation from '../view/util/element-creation';
import { IGetDataCar, IGetDataWinner, IHTMLElement } from './interfaces';

export interface IWinnerView extends IHTMLElement {
  winner: ElementCreation;
  updateText(count: number, current: number): void;
  createLineCar(car: IGetDataCar, carWin: IGetDataWinner, index: number, page: number): void;
}
