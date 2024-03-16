import Listener from '../listener';
import FieldResult from '../../fieldGame/fieldResult';
import ButtonStart from '../button/buttonStart';
import { ISelectBlock } from '../../../interfaces/interfaces';

export default class SelectBlock extends Listener implements ISelectBlock {
  public eventListener: string;

  public game = new FieldResult();

  public updateText = new ButtonStart('click');

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

  public changeGameField(): void {
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
        this.game.setSentence(changeLevel, currentRound, 0);
      }
      if (changeRound !== currentRound) {
        this.game.setSentence(currentLevel, changeRound, 0);
      }
      this.updateText.textHelp();
    }
  }

  public updateFieldGame(): void {
    const lines = Array.from(document.querySelectorAll('.field-result__line'));
    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;

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
