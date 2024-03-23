import WorkWithServer from '../model/workWithServer';
import GarageView from '../view/mainView/garageView/garageView';
import { ICreateCar } from '../interfaces/interfaces';
import { mainParams } from '../view/util/params';

export default class Util {
  private server = new WorkWithServer();

  public randomRange(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  public createCar(name: string, color: string): void {
    const garageView = new GarageView(mainParams);
    const car: ICreateCar = { name, color };
    this.server.createCarServer(car).then((el) => {
      const garage = this.checkGarage();
      if (typeof garage === 'object') {
        garageView.createLineCar(el);
      }
      this.server.getCarsServer(this.getCurrentGaragePage()).then((answer) => {
        garageView.updateText(answer.total, this.getCurrentGaragePage());
        if (this.getCountCars() > 7) {
          document.querySelector('.buttons__next-garage')?.classList.remove('disabled');
        }
      });
    });
  }

  private checkGarage(): boolean | HTMLElement {
    const garage = document.querySelector('.garage__cars') as HTMLElement;

    if (garage.children.length < 7) {
      return garage;
    }

    return false;
  }

  public getCurrentGaragePage(): number {
    const page = document.querySelector('.garage__current-page') as HTMLElement;
    const text = page.textContent;

    if (text) {
      return Number(text.split(' ').at(-1)!.slice(1));
    }

    return 1;
  }

  public getCurrentWinnerPage(): number {
    const page = document.querySelector('.winner__current-page') as HTMLElement;
    const text = page.textContent;

    if (text) {
      return Number(text.split(' ').at(-1)!.slice(1));
    }

    return 1;
  }

  public getCountCars(): number {
    const cars = document.querySelector('.garage__title') as HTMLElement;
    const text = cars.textContent;

    if (text) {
      return Number(text.split(' ').at(-1)!.slice(1, -1));
    }

    return 1;
  }
}
