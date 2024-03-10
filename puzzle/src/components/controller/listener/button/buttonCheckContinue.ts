import FieldResult from '../../fieldGame/fieldResult';
import Listener from '../listener';

export default class ButtonCheckContinue extends Listener {
  public eventListener: string;

  public game = new FieldResult();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;
    button.classList.add('display-none');

    this.updateGame();
  }

  updateGame(): void {
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const countRounds = Number(fieldResult?.getAttribute('data-countrounds'));
    let currentWords = Number(fieldResult?.getAttribute('data-currentwords'));
    let round = Number(fieldResult?.getAttribute('data-round'));
    let level = Number(fieldResult?.getAttribute('data-level'));

    this.updateElements(currentWords);

    if (round === countRounds - 1 && currentWords === 9) {
      round = 0;
      if (level === 5) {
        level = 0;
      } else {
        level += 1;
      }
    }

    if (currentWords === 9) {
      currentWords = 0;
      if (Number(fieldResult?.getAttribute('data-round')) === countRounds - 1) {
        round = 0;
      } else {
        round += 1;
      }
    } else {
      currentWords += 1;
    }

    this.game.setSentence(level, round, currentWords);
  }

  updateElements(currentWords: number): void {
    const lineResult = Array.from(
      document.querySelectorAll('.field-result__line'),
    ) as HTMLElement[];
    const fieldClickBlocks = document.querySelector('.main__field-click') as HTMLElement;

    fieldClickBlocks.innerHTML = '';

    if (currentWords === 9) {
      lineResult.forEach((el) => {
        const element = el;
        element.classList.remove('solution');
        element.innerHTML = '';
      });
    } else {
      lineResult[currentWords].classList.add('solution');
      const lineBlocks = Array.from(lineResult[currentWords].children);
      lineBlocks.forEach((el) => {
        el.classList.add('properly');
      });
    }
  }
}
