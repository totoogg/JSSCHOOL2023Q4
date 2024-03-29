import GarageView from '../garageView/garageView';
import ElementCreation from '../../util/element-creation';
import { IGetDataCar, IGetDataWinner, IParams, IWinnerView } from '../../../interfaces/interfaces';
import {
  buttonsNextWinnerParams,
  buttonsPrevWinnerParams,
  carColorHeadParams,
  carColorParams,
  carNameHeadParams,
  carNameParams,
  carNumberHeadParams,
  carNumberParams,
  carTimeHeadParams,
  carTimeParams,
  carWinsHeadParams,
  carWinsParams,
  timeHeadArrowParams,
  winnerButtonsParams,
  winnerCarsParams,
  winnerCurrentParams,
  winnerTitleParams,
  winsHeadArrowParams,
} from '../../util/params';

import './winnerView.scss';

export default class WinnerView implements IWinnerView {
  public winner: ElementCreation;

  private winnerTitle: ElementCreation = new ElementCreation(winnerTitleParams);

  private winnerCurrent: ElementCreation = new ElementCreation(winnerCurrentParams);

  private winnerCars: ElementCreation = new ElementCreation(winnerCarsParams);

  private winnerButtons: ElementCreation = new ElementCreation(winnerButtonsParams);

  private garage: GarageView = new GarageView(winnerButtonsParams);

  constructor(param: IParams) {
    this.winner = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.winner) {
      return this.winner;
    }
    return null;
  }

  public createElements(): void {
    this.createTable();
    this.createButtons();

    this.winner
      .getElement()
      ?.append(
        this.winnerTitle.getElement()!,
        this.winnerCurrent.getElement()!,
        this.winnerCars.getElement()!,
        this.winnerButtons.getElement()!,
      );
  }

  public updateText(count: number, current: number): void {
    document.querySelector('.winner__title')!.textContent = `Winners (${count})`;
    document.querySelector('.winner__current-page')!.textContent = `Page #${current}`;
  }

  private createButtons(): void {
    const next = new ElementCreation(buttonsNextWinnerParams);
    const prev = new ElementCreation(buttonsPrevWinnerParams);

    this.winnerButtons.getElement()?.append(prev.getElement()!, next.getElement()!);
  }

  private createTable(): void {
    const number = new ElementCreation(carNumberHeadParams);
    const car = new ElementCreation(carColorHeadParams);
    const name = new ElementCreation(carNameHeadParams);
    const win = new ElementCreation(carWinsHeadParams);
    const time = new ElementCreation(carTimeHeadParams);
    const winArrow = new ElementCreation(winsHeadArrowParams);
    const timeArrow = new ElementCreation(timeHeadArrowParams);

    win.getElement()!.append(winArrow.getElement()!);
    time.getElement()!.append(timeArrow.getElement()!);

    number.getElement()!.setAttribute('data-head', 'true');
    car.getElement()!.setAttribute('data-head', 'true');
    name.getElement()!.setAttribute('data-head', 'true');
    win.getElement()!.setAttribute('data-head', 'true');
    time.getElement()!.setAttribute('data-head', 'true');
    time.getElement()!.setAttribute('data-sort', 'time');
    win.getElement()!.setAttribute('data-sort', 'wins');

    this.winnerCars
      .getElement()!
      .append(
        number.getElement()!,
        car.getElement()!,
        name.getElement()!,
        win.getElement()!,
        time.getElement()!,
      );
  }

  public createLineCar(
    car: IGetDataCar,
    carWin: IGetDataWinner,
    index: number,
    page: number,
  ): void {
    const table = document.querySelector('.winner__table') as HTMLElement;
    const number = new ElementCreation(carNumberParams);
    const color = new ElementCreation(carColorParams);
    const name = new ElementCreation(carNameParams);
    const win = new ElementCreation(carWinsParams);
    const time = new ElementCreation(carTimeParams);

    number.getElement()!.textContent = `${(page - 1) * 10 + index + 1}`;
    win.getElement()!.textContent = `${carWin.wins}`;
    time.getElement()!.textContent = `${carWin.time}`;
    color.getElement()!.innerHTML = this.garage.setImageCar(car.color);
    name.getElement()!.textContent = `${car.name}`;

    table.append(
      number.getElement()!,
      color.getElement()!,
      name.getElement()!,
      win.getElement()!,
      time.getElement()!,
    );
  }
}
