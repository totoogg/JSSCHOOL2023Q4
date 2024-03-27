import WorkWithServer from '../model/workWithServer';
import HeaderView from '../view/headerView/headerView';
import GarageView from '../view/mainView/garageView/garageView';
import MainView from '../view/mainView/mainView';
import Util from './util';
import { headerParams, mainParams } from '../view/util/params';
import ButtonRemoveCar from './listeners/buttons/controlCar/buttonRemoveCar';

export default class App {
  private header: HeaderView = new HeaderView(headerParams);

  private main: MainView = new MainView(mainParams);

  private util = new Util();

  private server = new WorkWithServer();

  public createPage() {
    const garage = new GarageView(mainParams);
    const buttonRemove = new ButtonRemoveCar('click');
    this.server.getCarsServer(1).then((answer) => {
      garage.updateText(answer.total, 1);
      answer.cars.forEach((el) => {
        garage.createLineCar(el);
      });
      if (this.util.getCountCars() > 7) {
        document.querySelector('.buttons__next-garage')?.classList.remove('disabled');
      }
    });

    document.body.append(
      this.header.header.getElement() as HTMLElement,
      this.main.main.getElement() as HTMLElement,
    );

    buttonRemove.updateWinner();

    document.addEventListener('click', () => {
      const winnerPopUp = document.querySelector('.garage__winner') as HTMLElement;
      const lineArr = Array.from(
        document.querySelectorAll('.cars__line[data-drive="start"]'),
      ) as HTMLElement[];

      if (!winnerPopUp.classList.contains('display-none') && lineArr.length === 0) {
        winnerPopUp.classList.add('display-none');
      }
    });
  }
}
