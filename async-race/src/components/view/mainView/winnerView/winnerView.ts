import ElementCreation from '../../util/element-creation';
import { IParams } from '../../../interfaces/interfaces';
import {
  buttonsNextWinnerParams,
  buttonsPrevWinnerParams,
  winnerButtonsParams,
  winnerCarsParams,
  winnerCurrentParams,
  winnerTitleParams,
} from '../../util/params';

import './winnerView.scss';

export default class WinnerView {
  public winner: ElementCreation;

  private winnerTitle: ElementCreation = new ElementCreation(winnerTitleParams);

  private winnerCurrent: ElementCreation = new ElementCreation(winnerCurrentParams);

  private winnerCars: ElementCreation = new ElementCreation(winnerCarsParams);

  private winnerButtons: ElementCreation = new ElementCreation(winnerButtonsParams);

  constructor(param: IParams) {
    this.winner = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.winner) {
      return this.winner;
    }
    return null;
  }

  public createElements(): void {
    this.createButtons();

    this.winner
      .getElement()
      ?.append(
        this.winnerTitle.getElement()!,
        this.winnerCurrent.getElement()!,
        this.winnerCars.getElement()!,
        this.winnerButtons.getElement()!,
      );
  }

  public updateText(count: number, current: number): void {
    document.querySelector('.winner__title')!.textContent = `Winners (${count})`;
    document.querySelector('.winner__current-page')!.textContent = `Page #${current}`;
  }

  public createButtons(): void {
    const next = new ElementCreation(buttonsNextWinnerParams);
    const prev = new ElementCreation(buttonsPrevWinnerParams);

    this.winnerButtons.getElement()?.append(prev.getElement()!, next.getElement()!);
  }
}
