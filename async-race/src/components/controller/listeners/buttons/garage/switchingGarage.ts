import Util from '../../../util';
import Listener from '../../listener';
import WorkWithServer from '../../../../model/workWithServer';
import GarageView from '../../../../view/mainView/garageView/garageView';
import { mainParams } from '../../../../view/util/params';
import { ISwitchingGarage } from '../../../../interfaces/interfaces';

export default class SwitchingGarage extends Listener implements ISwitchingGarage {
  public eventListener: string;

  private util = new Util();

  private server = new WorkWithServer();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const currentPage = this.util.getCurrentGaragePage();
    const garage = document.querySelector('.garage__cars') as HTMLElement;
    const countCarsPage = Math.ceil(this.util.getCountCars() / 7);

    if (!target.classList.contains('disabled')) {
      if (target.textContent === 'PREV' && currentPage !== 1) {
        garage.innerHTML = '';
        this.updateGarage(currentPage - 1);
      }

      if (target.textContent === 'NEXT' && currentPage !== countCarsPage) {
        garage.innerHTML = '';
        this.updateGarage(currentPage + 1);
      }
    }
  }

  private updateGarage(page: number): void {
    const garageView = new GarageView(mainParams);
    this.server.getCarsServer(page).then((cars) => {
      garageView.updateText(cars.total, page);
      this.updateSwitchingButton();
      cars.cars.forEach((el) => {
        garageView.createLineCar(el);
      });
    });
  }

  public updateSwitchingButton(): void {
    const currentPage = this.util.getCurrentGaragePage();
    const countCarsPage = Math.ceil(this.util.getCountCars() / 7);

    if (currentPage === countCarsPage) {
      document.querySelector('.buttons__next-garage')?.classList.add('disabled');
    } else {
      document.querySelector('.buttons__next-garage')?.classList.remove('disabled');
    }

    if (currentPage === 1) {
      document.querySelector('.buttons__prev-garage')?.classList.add('disabled');
    } else {
      document.querySelector('.buttons__prev-garage')?.classList.remove('disabled');
    }
  }
}
