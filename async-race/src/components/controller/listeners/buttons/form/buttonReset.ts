import WorkWithServer from '../../../../model/workWithServer';
import Listener from '../../listener';

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

    if (!target.classList.contains('disabled')) {
      const arrButtons = Array.from(document.querySelectorAll('.button')) as HTMLElement[];
      const arrLine = Array.from(document.querySelectorAll('.cars__line')) as HTMLElement[];

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
      if (el.classList.contains('disabled')) {
        el.setAttribute('data-disabled-reset', 'true');
      }

      el.classList.add('disabled');
    });
  }

  private returnButton(arrButtons: HTMLElement[]): void {
    arrButtons.forEach((el) => {
      if (
        (el.getAttribute('data-disabled-reset') !== 'true' ||
          el.classList.contains('car__start')) &&
        !el.classList.contains('car__stop')
      ) {
        el.classList.remove('disabled');
      }
    });
  }
}
