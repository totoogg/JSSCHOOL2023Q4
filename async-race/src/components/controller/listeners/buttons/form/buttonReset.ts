import WorkWithServer from '../../../../model/workWithServer';
import Listener from '../../listener';
import SwitchingGarage from '../garage/switchingGarage';
import SwitchingWinner from '../winner/switchingWinner';

export default class ButtonReset extends Listener {
  public eventListener: string;

  private server = new WorkWithServer();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target.classList.contains('disabled') && document.querySelector('.cars__line')) {
      const arrButtons = Array.from(document.querySelectorAll('.button')) as HTMLElement[];
      const arrLine = Array.from(document.querySelectorAll('.cars__line')) as HTMLElement[];
      const winnerPopUp = document.querySelector('.garage__winner') as HTMLElement;

      target.setAttribute('data-click', 'click');
      winnerPopUp.classList.add('display-none');

      this.blockButton(arrButtons);

      Promise.all(
        arrLine.map((el) => {
          const element = el;

          el.setAttribute('data-drive', 'stop');

          return this.server
            .startStopCarServer(el.getAttribute('data-id')!, 'stopped')
            .then((stop) => {
              if (stop) {
                const car = element.querySelector('.car__image') as HTMLElement;
                car.style.transform = `translate(0px)`;
              }
            });
        }),
      ).then((el) => {
        if (el) {
          this.returnButton(arrButtons);
        }
      });
    }
  }

  private blockButton(arrButtons: HTMLElement[]): void {
    arrButtons.forEach((el) => {
      el.classList.add('disabled');
    });
  }

  private returnButton(arrButtons: HTMLElement[]): void {
    const pageGarage = new SwitchingGarage('click');
    const pageWinner = new SwitchingWinner('click');
    const id = document.querySelector('.update__button')?.getAttribute('data-id');

    arrButtons.forEach((el) => {
      el.classList.remove('disabled');

      if (
        (el.classList.contains('update__button') && !el.getAttribute('data-id')) ||
        el.classList.contains('car__stop') ||
        el.classList.contains('header__garage') ||
        (el.classList.contains('block__select') && el.getAttribute('data-id') === id)
      ) {
        el.classList.add('disabled');
      }
    });

    pageGarage.updateSwitchingButton();
    pageWinner.updateSwitchingButton();
  }
}
