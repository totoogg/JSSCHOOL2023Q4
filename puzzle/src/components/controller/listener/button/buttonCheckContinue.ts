import FieldResult from '../../fieldGame/fieldResult';
import * as sentences from '../../../model/data/wordCollection';
import Listener from '../listener';
import ButtonStart from './buttonStart';
import { IButtonCheckContinue, IUserSave } from '../../../interfaces/interfaces';

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
    const levelSelect = document.querySelector('.level__choice') as HTMLSelectElement;
    const levelOptionSolution = Array.from(
      document.querySelectorAll('.solution'),
    ) as HTMLSelectElement[];
    const pageSelect = document.querySelector('.page__choice') as HTMLSelectElement;
    let currentWords = Number(fieldResult?.getAttribute('data-currentwords'));
    let round = Number(fieldResult?.getAttribute('data-round'));
    let level = Number(fieldResult?.getAttribute('data-level'));

    if (this.checkResultRound(currentWords)) {
      this.updateElements(currentWords);

      if (round === countRounds - 1 && currentWords === 9) {
        if (countRounds === levelOptionSolution.length) {
          levelSelect[level].classList.add('solution');
          this.saveLocalSelectLevel();
        }
        round = 0;
        level = level === 5 ? 0 : (level += 1);
      }

      if (currentWords === 9) {
        pageSelect[round].classList.add('solution');
        this.saveLocalSelectRound();
        currentWords = 0;
        round =
          Number(fieldResult?.getAttribute('data-round')) === countRounds - 1 ? 0 : (round += 1);
      } else {
        currentWords += 1;
      }

      this.saveLocal(level, round, countRounds);
      this.game.setSentence(level, round, currentWords);
      this.updateLevelSelect(level);
      this.updatePageSelect(round);
    }
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

  public updatePageSelect(round: number): void {
    const pageSelect = document.querySelector('.page__choice') as HTMLSelectElement;

    pageSelect.value = `${round}`;
  }

  public updateLevelSelect(level: number): void {
    const levelSelect = document.querySelector('.level__choice') as HTMLSelectElement;

    levelSelect.value = `${level}`;
  }

  public saveLocal(level: number, round: number, countRounds: number): void {
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const index = localData.findIndex((el) => el.login);
    const user = localData[index];
    user.saveData = {
      countRounds,
      level,
      round,
    };

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }

  public saveLocalSelectLevel(): void {
    const arrLevel = Array.from(
      document.querySelectorAll('.level__choice > .choice__option'),
    ) as HTMLOptionElement[];
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const indexLogin = localData.findIndex((el) => el.login);
    const user = localData[indexLogin];

    arrLevel.forEach((el, index) => {
      if (el.classList.contains('solution')) {
        user.level![index] = Array(user.level![index].length).fill(true);
      }
    });

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }

  public saveLocalSelectRound(): void {
    const levelSelect = document.querySelector('.level__choice') as HTMLSelectElement;
    const valueLevel = Number(levelSelect.value);
    const pageSelect = document.querySelector('.page__choice') as HTMLSelectElement;
    const valuePage = Number(pageSelect.value);
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const indexLogin = localData.findIndex((el) => el.login);
    const user = localData[indexLogin];

    user.level![valueLevel][valuePage] = true;

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }

  public checkResultRound(currentWords: number): boolean {
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const helpBlock = document.querySelector('.main__field-help') as HTMLElement;
    const fieldResultLine = Array.from(
      document.querySelectorAll('.field-result__line'),
    ) as HTMLElement[];
    const buttonSolution = document.querySelector('.field-buttons__solution') as HTMLElement;

    if (currentWords === 9 && !fieldResult.getAttribute('data-solution')) {
      this.showResult();

      fieldResult.setAttribute('data-solution', 'true');

      return false;
    }

    fieldResultLine.forEach((el) => {
      el.classList.remove('hide');
    });

    buttonSolution.classList.remove('display-none');
    helpBlock.classList.remove('hide');
    fieldResult.setAttribute('data-solution', '');

    return true;
  }

  public showResult(): void {
    const text = Object.values(sentences);
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const buttonSolution = document.querySelector('.field-buttons__solution') as HTMLElement;
    const buttonContinue = document.querySelector('.field-buttons__check-continue') as HTMLElement;
    const round = Number(fieldResult?.getAttribute('data-round'));
    const level = Number(fieldResult?.getAttribute('data-level'));
    const helpBlock = document.querySelector('.main__field-help') as HTMLElement;
    const clickBlock = document.querySelector('.main__field-click') as HTMLElement;
    const fieldResultLine = Array.from(
      document.querySelectorAll('.field-result__line'),
    ) as HTMLElement[];
    const description = text[level].rounds[round].levelData;

    fieldResultLine.forEach((el) => {
      el.classList.add('hide');
    });

    clickBlock.innerHTML = '';
    clickBlock.textContent = `${description.author} - ${description.name} (${description.year})`;
    helpBlock.classList.add('hide');
    buttonSolution.classList.add('display-none');
    buttonContinue.classList.remove('display-none');
    buttonContinue.textContent = 'Continue';
  }
}
