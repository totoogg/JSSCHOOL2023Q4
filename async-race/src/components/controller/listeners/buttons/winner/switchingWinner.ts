import Util from '../../../util';
import Listener from '../../listener';
import WorkWithServer from '../../../../model/workWithServer';
import WinnerView from '../../../../view/mainView/winnerView/winnerView';
import { mainParams } from '../../../../view/util/params';
import { ISwitchingWinner } from '../../../../interfaces/interfaces';

export default class SwitchingWinner extends Listener implements ISwitchingWinner {
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
    const currentPage = this.util.getCurrentWinnerPage();
    const countCarsPage = Math.ceil(this.util.getCountWinner() / 10);

    if (!target.classList.contains('disabled')) {
      if (target.textContent === 'PREV' && currentPage !== 1) {
        this.updateWinner(currentPage - 1);
      }

      if (target.textContent === 'NEXT' && currentPage !== countCarsPage) {
        this.updateWinner(currentPage + 1);
      }
    }
  }

  private updateWinner(page: number): void {
    const winnerView = new WinnerView(mainParams);
    const table = document.querySelector('.winner__table') as HTMLElement;
    const arrow = Array.from(document.querySelectorAll('.arrow')).find(
      (element) => !element.classList.contains('display-none'),
    ) as HTMLElement;
    const sort = arrow!.parentElement?.getAttribute('data-sort') as string;
    const order = arrow?.classList.contains('ASC') ? 'ASC' : 'DESC';

    Array.from(table.children).forEach((el) => {
      if (!el.getAttribute('data-head')) el.remove();
    });
    this.server.getWinnersServer(page, 10, sort, order).then((cars) => {
      winnerView.updateText(cars.total, page);
      if (this.util.getCountWinner() > 10) {
        document.querySelector('.buttons__next-winner')?.classList.remove('disabled');
      }
      Promise.all(cars.cars.map((el) => this.server.getCarServer(el.id))).then((carsID) => {
        carsID.forEach((car, index) => {
          winnerView.createLineCar(car, cars.cars[index], index, page);
        });
        this.updateSwitchingButton();
      });
    });
  }

  public updateSwitchingButton(): void {
    const currentPage = this.util.getCurrentWinnerPage();
    const countCarsPage = Math.ceil(this.util.getCountWinner() / 10);

    if (currentPage === countCarsPage) {
      document.querySelector('.buttons__next-winner')?.classList.add('disabled');
    } else {
      document.querySelector('.buttons__next-winner')?.classList.remove('disabled');
    }

    if (currentPage === 1) {
      document.querySelector('.buttons__prev-winner')?.classList.add('disabled');
    } else {
      document.querySelector('.buttons__prev-winner')?.classList.remove('disabled');
    }
  }
}
