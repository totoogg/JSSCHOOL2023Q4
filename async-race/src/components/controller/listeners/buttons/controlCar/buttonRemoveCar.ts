import WorkWithServer from '../../../../model/workWithServer';
import GarageView from '../../../../view/mainView/garageView/garageView';
import Util from '../../../util';
import Listener from '../../listener';
import WinnerView from '../../../../view/mainView/winnerView/winnerView';
import { mainParams } from '../../../../view/util/params';

export default class ButtonRemoveCar extends Listener {
  public eventListener: string;

  private server = new WorkWithServer();

  private util = new Util();

  private currentGaragePage!: number;

  private currentWinnerPage!: number;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const current = document.querySelector(
      `.cars__line[data-id='${target.getAttribute('data-id')}']`,
    ) as HTMLElement;
    const id = Number(target.getAttribute('data-id'));
    const buttonUpdate = document.querySelector('.update__button') as HTMLElement;
    this.currentGaragePage = this.util.getCurrentGaragePage();
    this.currentWinnerPage = this.util.getCurrentWinnerPage();

    if (!target.classList.contains('disabled')) {
      if (
        id === Number(buttonUpdate.getAttribute('data-id')) &&
        !buttonUpdate.classList.contains('disabled')
      ) {
        this.updateForm();
      }

      this.server.getWinnersServer(this.currentWinnerPage, 10, 'time', 'ASC').then((cars) => {
        cars.cars.forEach((el) => {
          if (el.id === id) this.server.deleteWinnerServer(id);
        });
      });

      this.server.deleteCarServer(id).then((el) => {
        if (el) this.updateCars();
      });
      current.remove();
    }
  }

  private updateCars(): void {
    const garageView = new GarageView(mainParams);
    const arrCarsId = Array.from(document.querySelectorAll('.cars__line')).map((el) =>
      el.getAttribute('data-id'),
    ) as string[];

    this.server.getCarsServer(this.currentGaragePage).then((cars) => {
      garageView.updateText(cars.total, this.currentGaragePage);
      cars.cars.forEach((el) => {
        if (!arrCarsId.includes(`${el.id}`)) garageView.createLineCar(el);
      });
      if (this.util.getCountCars() < 8) {
        document.querySelector('.buttons__next-garage')?.classList.add('disabled');
      }
    });

    this.updateWinner();
  }

  public updateWinner(): void {
    const winnerView = new WinnerView(mainParams);
    const table = document.querySelector('.winner__table') as HTMLElement;
    this.currentWinnerPage = this.util.getCurrentWinnerPage();

    Array.from(table.children).forEach((el) => {
      if (!el.getAttribute('data-head')) el.remove();
    });
    this.server.getWinnersServer(this.currentWinnerPage, 10, 'time', 'ASC').then((cars) => {
      winnerView.updateText(cars.total, this.currentWinnerPage);
      if (this.util.getCountWinner() > 10) {
        document.querySelector('.buttons__next-winner')?.classList.remove('disabled');
      }
      Promise.all(cars.cars.map((el) => this.server.getCarServer(el.id))).then((carsID) => {
        carsID.forEach((car, index) => {
          winnerView.createLineCar(car, cars.cars[index], index, this.currentWinnerPage);
        });
      });
    });
  }

  private updateForm(): void {
    const nameCar = document.querySelector('.update__text') as HTMLInputElement;
    document.querySelector('.update__color')?.classList.add('disabled');
    document.querySelector('.update__button')?.classList.add('disabled');
    nameCar.classList.add('disabled');
    nameCar.setAttribute('readonly', 'true');
    nameCar.value = '';
  }
}
