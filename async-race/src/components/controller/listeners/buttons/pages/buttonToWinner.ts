import WorkWithServer from '../../../../model/workWithServer';
import WinnerView from '../../../../view/mainView/winnerView/winnerView';
import Util from '../../../util';
import Listener from '../../listener';
import { mainParams } from '../../../../view/util/params';

export default class ButtonToWinner extends Listener {
  public eventListener: string;

  private server = new WorkWithServer();

  private util = new Util();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target.classList.contains('disabled')) {
      const form = document.querySelector('.main__form') as HTMLElement;
      const garage = document.querySelector('.main__garage') as HTMLElement;
      const winners = document.querySelector('.main__winner') as HTMLElement;
      const toGarage = document.querySelector('.header__garage') as HTMLElement;

      form.classList.add('display-none');
      garage.classList.add('display-none');
      toGarage.classList.remove('disabled');
      winners.classList.remove('display-none');
      target.classList.add('disabled');

      this.updateWinner();
    }
  }

  private updateWinner(): void {
    const table = document.querySelector('.winner__table') as HTMLElement;
    const winnerView = new WinnerView(mainParams);

    Array.from(table.children).forEach((el) => {
      if (!el.getAttribute('data-head')) el.remove();
    });
    this.server.getWinnersServer(this.util.getCurrentWinnerPage()).then((cars) => {
      winnerView.updateText(cars.total, this.util.getCurrentWinnerPage());
      cars.cars.forEach((el, index) => {
        this.server.getCarServer(el.id).then((car) => {
          winnerView.createLineCar(car, el, index);
        });
      });
    });
  }
}
