import WorkWithServer from '../../../../model/workWithServer';
import Listener from '../../listener';

export default class ButtonRace extends Listener {
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
      document.querySelector('.buttons__reset')?.removeAttribute('data-click');

      target?.classList.add('disabled');
      target?.setAttribute('data-race', 'race');

      const arrLine = Array.from(document.querySelectorAll('.cars__line')) as HTMLElement[];
      const startButton = Array.from(document.querySelectorAll('.car__start')) as HTMLElement[];

      this.blockButton();

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
          startButton.forEach((start) => {
            start.classList.remove('disabled');
            const click = new Event('click');
            start.dispatchEvent(click);
          });
        }
      });
    }
  }

  private blockButton(): void {
    Array.from(document.querySelectorAll('.button')).forEach((el) => {
      if (el.classList.contains('disabled')) {
        el.setAttribute('data-disabled', 'true');
      }

      el.classList.add('disabled');
    });
  }
}
