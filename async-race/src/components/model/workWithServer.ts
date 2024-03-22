import { IGetData } from '../interfaces/IGetData';

export default class WorkWithServer {
  public async getCarsServer(): Promise<{ cars: IGetData[]; total: number }> {
    const res = await fetch('http://127.0.0.1:3000/garage?_limit=7&_page=1', {
      method: 'GET',
    });

    if (res.ok) {
      console.log(res);
      console.log(res.headers.get('X-Total-Count'));
      const data = await res.json();
      console.log(data);
      return { cars: data, total: Number(res.headers.get('X-Total-Count')) };
    }
    throw Error(`Error HTTP: ${res.status}`);
  }
}
