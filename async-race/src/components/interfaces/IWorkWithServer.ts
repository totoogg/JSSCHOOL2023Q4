import { ICreateCar, ICreateWin, IGetDataCar, IGetDataWinner } from './interfaces';

export interface IWorkWithServer {
  getCarsServer(page: number): Promise<{ cars: IGetDataCar[]; total: number }>;
  getWinnersServer(
    page: number,
    limit: number,
    sort: string,
    order: string,
  ): Promise<{ cars: IGetDataWinner[]; total: number }>;
  getCarServer(id: number): Promise<IGetDataCar>;
  createCarServer(car: ICreateCar): Promise<IGetDataCar>;
  createWinnerServer(car: ICreateWin): Promise<ICreateWin>;
  updateCarServer(car: ICreateCar, id: number): Promise<IGetDataCar>;
  updateWinnerServer(car: ICreateWin, id: string): Promise<ICreateWin>;
  deleteCarServer(id: number): Promise<boolean>;
  deleteWinnerServer(id: number): Promise<boolean>;
  startStopCarServer(id: string, status: string): Promise<{ velocity: number; distance: number }>;
  checkDriveServer(id: string): Promise<{ velocity: number; distance: number } | boolean>;
}
