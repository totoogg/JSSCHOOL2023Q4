import WorkWithServer from '../../../../model/workWithServer';
import Listener from '../../listener';

export default class ButtonUpdateCar extends Listener {
  public eventListener: string;

  private server = new WorkWithServer();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const nameCar = document.querySelector('.update__text') as HTMLInputElement;
    const colorCar = document.querySelector('.update__color') as HTMLInputElement;
    const id = Number(target.getAttribute('data-id'));

    if (!target.classList.contains('disabled')) {
      if (nameCar.value.trim() !== '') {
        const name = nameCar.value.trim();
        const color = colorCar.value;
        this.server.updateCarServer({ name, color }, id);
        this.updateGarage(name, color, id);
      }
    }
  }

  private updateGarage(name: string, color: string, id: number): void {
    const line = document.querySelector(`.cars__line[data-id='${id}']`) as HTMLElement;
    const nameCar = document.querySelector('.update__text') as HTMLInputElement;
    line.querySelector('.block__select')?.classList.remove('disabled');
    line.querySelector('.block__text')!.textContent = name;
    line.querySelector('.image__svg')!.setAttribute('fill', `${color}`);
    document.querySelector('.update__color')?.classList.add('disabled');
    document.querySelector('.update__button')?.classList.add('disabled');
    nameCar.classList.add('disabled');
    nameCar.setAttribute('readonly', 'true');
    nameCar.value = '';
  }
}
