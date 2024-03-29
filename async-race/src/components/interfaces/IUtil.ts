export interface IUtil {
  randomRange(min: number, max: number): number;
  createCar(name: string, color: string): void;
  getCurrentGaragePage(): number;
  getCurrentWinnerPage(): number;
  getCountCars(): number;
  getCountWinner(): number;
  driveStartCar(line: HTMLElement): void;
  driveStopCar(line: HTMLElement): void;
}
