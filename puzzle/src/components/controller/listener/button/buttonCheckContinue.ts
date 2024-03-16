import FieldResult from '../../fieldGame/fieldResult';
import Listener from '../listener';
import { IButtonCheckContinue } from '../../../interfaces/interfaces';
import ButtonStart from './buttonStart';

export default class ButtonCheckContinue extends Listener implements IButtonCheckContinue {
  public eventListener: string;

  public game = new FieldResult();

  public updateText = new ButtonStart('click');

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;

    if (button.textContent === 'Check') {
      this.checkResult();
    } else {
      this.game.showBackgroundBlock();
      button.textContent = 'Check';
      button.classList.add('display-none');

      this.updateGame();
      this.updateText.textHelp();
      this.hideHelp();
    }
  }

  public updateGame(): void {
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

  public updateElements(currentWords: number): void {
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
        element.removeAttribute('data-solution');
      });
    } else {
      lineResult[currentWords].classList.add('solution');
      const lineBlocks = Array.from(lineResult[currentWords].children);
      lineBlocks.forEach((el) => {
        el.classList.add('properly');
      });
    }
  }

  public checkResult(): void {
    const resultLine = Array.from(document.querySelectorAll('.field-result__line'));
    const checkLineIndex = resultLine.filter((el) => el.children.length > 0).length - 1;
    const checkLine = Array.from(resultLine[checkLineIndex].children)
      .map((el) => el.textContent)
      .join(' ');
    const totalLine = Array.from(document.querySelectorAll('.field-total__line'))[checkLineIndex]
      .textContent;

    if (checkLine === totalLine) {
      const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;
      button.textContent = 'Continue';
      this.errorHighlighting();
      this.showHelp();
    } else {
      this.errorHighlighting();
    }
  }

  public errorHighlighting(): void {
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const fieldTotal = Array.from(document.querySelectorAll('.field-total__line')) as HTMLElement[];
    const currentIndex = Number(fieldResult.getAttribute('data-currentwords'));
    const totalArr = fieldTotal[currentIndex].textContent!.split(' ');
    const lineBlock = Array.from(
      document.querySelectorAll('.line__block:not(.properly)'),
    ) as HTMLElement[];
    const clickBlock = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];

    totalArr.forEach((el, index) => {
      if (el !== lineBlock[index].textContent) {
        clickBlock
          .find((element) => Number(element.getAttribute('data-index')) === index)!
          .classList.add('wrong');
      } else {
        clickBlock
          .find((element) => Number(element.getAttribute('data-index')) === index)!
          .classList.add('right');
      }
    });
  }

  public showHelp(): void {
    const textHelp = document.querySelector('.field-help__text-help') as HTMLElement;
    const soundHelp = document.querySelector('.field-help__sound-help') as HTMLElement;

    textHelp.classList.remove('hide');
    soundHelp.classList.remove('hide');
  }

  public hideHelp(): void {
    const textHelpButton = document.querySelector('.text-help__text') as HTMLElement;
    const textHelp = document.querySelector('.field-help__text-help') as HTMLElement;
    const soundHelpButton = document.querySelector('.text-help__sound') as HTMLElement;
    const soundHelp = document.querySelector('.field-help__sound-help') as HTMLElement;

    if (!textHelpButton.classList.contains('active')) {
      textHelp.classList.add('hide');
    }
    if (!soundHelpButton.classList.contains('active')) {
      soundHelp.classList.add('hide');
    }
  }
}
