import { IGetDataCar } from '../interfaces/IGetData';
import { ICreateCar, IGetDataWinner } from '../interfaces/interfaces';

export default class WorkWithServer {
  public async getCarsServer(page: number): Promise<{ cars: IGetDataCar[]; total: number }> {
    const res = await fetch(`http://127.0.0.1:3000/garage?_limit=7&_page=${page}`, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      return { cars: data, total: Number(res.headers.get('X-Total-Count')) };
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async getWinnersServer(page: number): Promise<{ cars: IGetDataWinner[]; total: number }> {
    const res = await fetch(
      `http://127.0.0.1:3000/winners?_limit=10&_page=${page}&_sort=time&_order=ASC`,
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

  public async createCarServer(car: ICreateCar): Promise<IGetDataCar> {
    const res = await fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async updateCarServer(car: ICreateCar, id: number): Promise<IGetDataCar> {
    const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async deleteCarServer(id: number): Promise<boolean> {
    const garage = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'DELETE',
    });

    if (garage.ok) {
      return true;
    }
    throw Error(`Error HTTP: ${garage.status}`);
  }

  public async deleteWinnerServer(id: number): Promise<boolean> {
    const winner = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'DELETE',
    });

    if (winner.ok) {
      return true;
    }
    throw Error(`Error HTTP: ${winner.status}`);
  }

  public async startStopCarServer(
    id: string,
    status: string,
  ): Promise<{ velocity: number; distance: number }> {
    const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    if (res.ok) {
      const data = await res.json();
      return { velocity: data.velocity, distance: data.distance };
    }
    throw Error(`Error HTTP: ${res.status}`);
  }

  public async checkDriveServer(
    id: string,
  ): Promise<{ velocity: number; distance: number } | boolean> {
    const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    if (res.ok) {
      const data = await res.json();
      return { velocity: data.velocity, distance: data.distance };
    }
    if (res.status === 500) {
      return false;
    }
    if (res.status === 404) {
      return true;
    }
    throw Error(`Error HTTP`);
  }
}
