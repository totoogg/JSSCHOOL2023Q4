import Listener from '../../listener';

export default class ButtonToGarage extends Listener {
  public eventListener: string;

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
      const toWinner = document.querySelector('.header__winner') as HTMLElement;

      form.classList.remove('display-none');
      garage.classList.remove('display-none');
      toWinner.classList.remove('disabled');
      winners.classList.add('display-none');
      target.classList.add('disabled');
    }
  }
}
