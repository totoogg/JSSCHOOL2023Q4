import ElementCreation from '../../util/element-creation';
import { IParams } from '../../../interfaces/interfaces';
import {
  buttonsNextGarageParams,
  buttonsPrevGarageParams,
  garageButtonsParams,
  garageCarsParams,
  garageCurrentParams,
  garageTitleParams,
} from '../../util/params';

import './garageView.scss';

export default class GarageView {
  public garage: ElementCreation;

  private garageTitle: ElementCreation = new ElementCreation(garageTitleParams);

  private garageCurrent: ElementCreation = new ElementCreation(garageCurrentParams);

  private garageCars: ElementCreation = new ElementCreation(garageCarsParams);

  private garageButtons: ElementCreation = new ElementCreation(garageButtonsParams);

  constructor(param: IParams) {
    this.garage = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.garage) {
      return this.garage;
    }
    return null;
  }

  public createElements(): void {
    this.createButtons();

    this.garage
      .getElement()
      ?.append(
        this.garageTitle.getElement()!,
        this.garageCurrent.getElement()!,
        this.garageCars.getElement()!,
        this.garageButtons.getElement()!,
      );
  }

  public updateText(count: number, current: number): void {
    document.querySelector('.garage__title')!.textContent = `Garage (${count})`;
    document.querySelector('.garage__current-page')!.textContent = `Page #${current}`;
  }

  public createButtons(): void {
    const next = new ElementCreation(buttonsNextGarageParams);
    const prev = new ElementCreation(buttonsPrevGarageParams);

    this.garageButtons.getElement()?.append(prev.getElement()!, next.getElement()!);
  }
}
