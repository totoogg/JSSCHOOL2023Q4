import Listener from '../listener';

export default class InputUpdateColor extends Listener {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('disabled')) {
      event.preventDefault();
    }
  }
}
