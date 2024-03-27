import Listener from '../../listener';
import ButtonRemoveCar from '../controlCar/buttonRemoveCar';
import { IEventElement } from '../../../../interfaces/interfaces';

export default class SortTime extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const child = target.lastChild as HTMLElement;
    const buttonRemove = new ButtonRemoveCar('click');

    if (child.classList.contains('display-none')) {
      child.classList.remove('display-none');
      child.classList.remove('DESC');
      child.classList.add('ASC');
      document.querySelector('.wins-head__arrow')?.classList.add('display-none');
      buttonRemove.updateWinner('wins', 'ASC');
    } else {
      const order = child?.classList.contains('ASC') ? 'ASC' : 'DESC';
      const newOrder = order === 'ASC' ? 'DESC' : 'ASC';

      child.classList.remove(order);
      child.classList.add(newOrder);
      buttonRemove.updateWinner('time', newOrder);
    }
  }
}
