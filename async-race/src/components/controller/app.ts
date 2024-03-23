import WorkWithServer from '../model/workWithServer';
import HeaderView from '../view/headerView/headerView';
import GarageView from '../view/mainView/garageView/garageView';
import MainView from '../view/mainView/mainView';
import WinnerView from '../view/mainView/winnerView/winnerView';
import Util from './util';
import { headerParams, mainParams } from '../view/util/params';

export default class App {
  private header: HeaderView = new HeaderView(headerParams);

  private main: MainView = new MainView(mainParams);

  private util = new Util();

  public createPage() {
    const res = new WorkWithServer();
    const garage = new GarageView(mainParams);
    const winner = new WinnerView(mainParams);
    res.getCarsServer(1).then((answer) => {
      garage.updateText(answer.total, 1);
      answer.cars.forEach((el) => {
        garage.createLineCar(el);
      });
      if (this.util.getCountCars() > 7) {
        document.querySelector('.buttons__next-garage')?.classList.remove('disabled');
      }
    });
    res.getWinnersServer(1).then((answer) => {
      winner.updateText(answer.total, 1);
      answer.cars.forEach((el, index) => {
        res.getCarServer(el.id).then((car) => {
          winner.createLineCar(car, el, index);
        });
      });
    });

    document.body.append(
      this.header.header.getElement() as HTMLElement,
      this.main.main.getElement() as HTMLElement,
    );
  }
}
