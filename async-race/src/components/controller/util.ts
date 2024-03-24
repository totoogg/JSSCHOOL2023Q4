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

  public driveStartCar(line: HTMLElement): void {
    const car = line.querySelector('.car__image') as HTMLElement;
    const finish = line.querySelector('.line__finish') as HTMLElement;
    const coordCar = car.getBoundingClientRect();
    const coordFinish = finish.getBoundingClientRect();
    const totalDist = coordFinish.right - coordCar.left;
    const id = line.getAttribute('data-id') as string;

    this.server.startStopCarServer(id, 'started').then((carSpeed) => {
      const time = Number((carSpeed.distance / carSpeed.velocity / 1000).toFixed(2));
      const delay = 1000 / (totalDist / 10 / time);

      let drive = setTimeout(function go() {
        if (line) {
          const current = Number(car.style.transform.slice(10, -3));

          if (current > totalDist) {
            line.setAttribute('data-drive', 'stop');
            clearTimeout(drive);
            // todo
          } else {
            car.style.transform = `translate(${current + 10}px)`;
            drive = setTimeout(go, delay);
          }
        } else {
          clearTimeout(drive);
        }
      }, delay);

      this.server.checkDriveServer(id).then((status) => {
        if (!status) clearTimeout(drive);
      });
    });
  }
}
