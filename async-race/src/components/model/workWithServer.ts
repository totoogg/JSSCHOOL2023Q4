import { IGetDataCar } from '../interfaces/IGetData';
import { IGetDataWinner } from '../interfaces/interfaces';

export default class WorkWithServer {
  public async getCarsServer(): Promise<{ cars: IGetDataCar[]; total: number }> {
    const res = await fetch('http://127.0.0.1:3000/garage?_limit=7&_page=1', {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      return { cars: data, total: Number(res.headers.get('X-Total-Count')) };
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async getWinnersServer(): Promise<{ cars: IGetDataWinner[]; total: number }> {
    const res = await fetch(
      `http://127.0.0.1:3000/winners?_limit=10&_page=1&_sort=time&_order=ASC`,
      {
        method: 'GET',
      },
    );

    if (res.ok) {
      const data = await res.json();
      return { cars: data, total: Number(res.headers.get('X-Total-Count')) };
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async getCarServer(id: number): Promise<IGetDataCar> {
    const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw Error(`Error HTTP: ${res.status}`);
  }
}
