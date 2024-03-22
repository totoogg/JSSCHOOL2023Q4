import ElementCreation from '../util/element-creation';
import GarageView from './garageView/garageView';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import { mainFormParams, mainGarageParams, mainWinnerParams } from '../util/params';

import './mainView.scss';

export default class MainView implements IHTMLElement {
  public main: ElementCreation;

  private formGarage: ElementCreation = new ElementCreation(mainFormParams);

  private garagePage: GarageView = new GarageView(mainGarageParams);

  private winnerPage: ElementCreation = new ElementCreation(mainWinnerParams);

  constructor(param: IParams) {
    this.main = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.main) {
      return this.main;
    }
    return null;
  }

  public createElements(): void {
    this.main
      .getElement()
      ?.append(
        this.formGarage.getElement()!,
        this.garagePage.garage.getElement()!,
        this.winnerPage.getElement()!,
      );
  }
}
