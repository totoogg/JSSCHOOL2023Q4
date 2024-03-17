import Listener from '../listener';
import FieldResult from '../../fieldGame/fieldResult';
import ButtonStart from '../button/buttonStart';
import ButtonCheckContinue from '../button/buttonCheckContinue';
import { IEventElement } from '../../../interfaces/interfaces';

export default class SelectBlock extends Listener implements IEventElement {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const currentElement = event.target as HTMLSelectElement;

    if (
      currentElement.classList.contains('level__choice') ||
      currentElement.classList.contains('page__choice')
    ) {
      this.changeGameField();
    }
  }

  private changeGameField(): void {
    const game = new FieldResult();
    const updateText = new ButtonStart('click');
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const level = document.querySelector('.level__choice') as HTMLSelectElement;
    const round = document.querySelector('.page__choice') as HTMLSelectElement;
    const currentLevel = Number(fieldResult.getAttribute('data-level'));
    const currentRound = Number(fieldResult.getAttribute('data-round'));
    const changeLevel = Number(level.value);
    const changeRound = Number(round.value);

    if (changeLevel !== currentLevel || changeRound !== currentRound) {
      this.updateFieldGame();
      if (changeLevel !== currentLevel) {
        game.setSentence(changeLevel, currentRound, 0);
      }
      if (changeRound !== currentRound) {
        game.setSentence(currentLevel, changeRound, 0);
      }

      updateText.textHelp();
    }
  }

  private updateFieldGame(): void {
    const continueButton = new ButtonCheckContinue('click');
    const lines = Array.from(document.querySelectorAll('.field-result__line'));
    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;

    continueButton.checkResultRound(0);
    button.textContent = `Check`;
    button.classList.add('display-none');

    lines.forEach((el) => {
      const element = el;
      element.innerHTML = '';
      element.classList.remove('solution');
      element.removeAttribute('data-solution');
    });
  }
}
