import WorkWithServer from '../model/workWithServer';
import GarageView from '../view/mainView/garageView/garageView';
import ButtonRemoveCar from './listeners/buttons/controlCar/buttonRemoveCar';
import { ICreateCar, IUtil } from '../interfaces/interfaces';
import { mainParams } from '../view/util/params';

export default class Util implements IUtil {
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

  public getCountWinner(): number {
    const cars = document.querySelector('.winner__title') as HTMLElement;
    const text = cars.textContent;

    if (text) {
      return Number(text.split(' ').at(-1)!.slice(1, -1));
    }

    return 1;
  }

  public driveStartCar(line: HTMLElement): void {
    const car = line.querySelector('.car__image') as HTMLElement;
    const finish = line.querySelector('.line__finish') as HTMLElement;
    const id = line.getAttribute('data-id') as string;

    this.server.startStopCarServer(id, 'started').then((carSpeed) => {
      const totalDist = finish.getBoundingClientRect().right - car.getBoundingClientRect().left;
      this.checkRaceButton(line);
      const time = Number((carSpeed.distance / carSpeed.velocity / 1000).toFixed(2));
      const delay = 1000 / (totalDist / 10 / time);

      let drive = setTimeout(function go() {
        if (line && line.getAttribute('data-drive') === 'start') {
          const current = Number(car.style.transform.slice(10, -3));

          if (current > totalDist) {
            const util = new Util();

            util.checkDriveCar(line, id, 'win', time);
            clearTimeout(drive);
          } else {
            car.style.transform = `translate(${current + 10}px)`;
            drive = setTimeout(go, delay);
          }
        } else {
          clearTimeout(drive);
        }
      }, delay);

      this.server.checkDriveServer(id).then((status) => {
        if (!status) {
          clearTimeout(drive);
          this.checkDriveCar(line, id);
        }
      });
    });
  }

  public driveStopCar(line: HTMLElement): void {
    const car = line.querySelector('.car__image') as HTMLElement;
    const buttonStart = line.querySelector('.car__start') as HTMLElement;
    const id = line.getAttribute('data-id') as string;

    this.server.startStopCarServer(id, 'stopped').then((stop) => {
      if (stop) {
        car.style.transform = `translate(0px)`;
        buttonStart.classList.remove('disabled');
      }
    });
  }

  private checkRaceButton(line: HTMLElement): void {
    const buttonRace = document.querySelector('.buttons__race') as HTMLElement;

    if (!buttonRace.classList.contains('disabled')) {
      line.querySelector('.car__stop')?.classList.remove('disabled');
    }
  }

  private checkDriveCar(line: HTMLElement, id: string, win?: string, time?: number): void {
    const buttonRace = document.querySelector('.buttons__race') as HTMLElement;
    const buttonReset = document.querySelector('.buttons__reset') as HTMLElement;
    const winnerPopUp = document.querySelector('.garage__winner') as HTMLElement;

    line.setAttribute('data-drive', 'stop');
    if (
      Array.from(document.querySelectorAll('.cars__line[data-drive="start"]')).length === 0 &&
      buttonRace.getAttribute('data-race') === 'race' &&
      buttonReset.getAttribute('data-click') !== 'click'
    ) {
      buttonRace.setAttribute('data-race', 'finish');
      Array.from(document.querySelectorAll('.button')).forEach((el) => {
        if (
          (el.getAttribute('data-disabled') !== 'true' ||
            el.classList.contains('car__stop') ||
            el.classList.contains('buttons__race')) &&
          !el.classList.contains('car__start')
        ) {
          el.classList.remove('disabled');
        }

        el.removeAttribute('data-disabled');
      });
    }

    if (
      win &&
      winnerPopUp.classList.contains('display-none') &&
      buttonRace.getAttribute('data-race') === 'race'
    ) {
      buttonReset.classList.remove('disabled');

      this.showWinnerPopUp(line.querySelector('.block__text')!.textContent!, time!);
      this.updateWinnerTable(id, time!);
    }
  }

  private showWinnerPopUp(name: string, time: number): void {
    const winnerPopUp = document.querySelector('.garage__winner') as HTMLElement;

    winnerPopUp.classList.remove('display-none');

    winnerPopUp.textContent = `${name} went first (${time}s)`;
  }

  private updateWinnerTable(id: string, time: number): void {
    const buttonRemove = new ButtonRemoveCar('click');
    const countWinner = this.getCountWinner();

    this.server
      .getWinnersServer(1, countWinner + 1, 'time', 'ASC')
      .then((winners) => {
        const winCar = winners.cars.find((el) => el.id === Number(id));
        if (winCar) {
          const timeWin = time < winCar?.time ? time : winCar.time;
          return this.server.updateWinnerServer({ wins: winCar.wins + 1, time: timeWin }, id);
        }
        return this.server.createWinnerServer({ id: Number(id), wins: 1, time });
      })
      .then((el) => {
        if (el) {
          const arrow = Array.from(document.querySelectorAll('.arrow')).find(
            (element) => !element.classList.contains('display-none'),
          ) as HTMLElement;
          const sort = arrow!.parentElement?.getAttribute('data-sort') as string;
          const order = arrow?.classList.contains('ASC') ? 'ASC' : 'DESC';

          buttonRemove.updateWinner(sort, order);
        }
      });
  }
}
