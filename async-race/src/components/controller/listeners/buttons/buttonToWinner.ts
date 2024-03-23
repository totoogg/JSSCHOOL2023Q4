import Listener from '../listener';

export default class ButtonToWinner extends Listener {
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
      const toGarage = document.querySelector('.header__garage') as HTMLElement;

      form.classList.add('display-none');
      garage.classList.add('display-none');
      toGarage.classList.remove('disabled');
      winners.classList.remove('display-none');
      target.classList.add('disabled');
    }
  }
}
