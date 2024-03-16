import * as sentences from '../../model/data/wordCollection';
import ElementCreation from '../../view/util/element-creation';
import { IFieldResult } from '../../interfaces/interfaces';
import { blockClickParams, blockParams } from '../../view/util/params';

export default class FieldResult implements IFieldResult {
  public currentDrop: HTMLElement | null = null;

  public setSentence(level: number, rounds: number, currentWords: number): void {
    const levelSentences = Object.values(sentences);

    const current = levelSentences[level].rounds[rounds].words;
    const countRounds = levelSentences[level].roundsCount;

    this.setAttributeResult(level, rounds, currentWords, countRounds);

    const linesTotal = Array.from(document.querySelectorAll('.field-total__line')) as Element[];

    linesTotal.forEach((el, index) => {
      const element = el;
      element.textContent = current[index].textExample;
    });

    this.setClickField(linesTotal[currentWords].textContent!);
    this.addClassItemClick();
    this.addBackgroundResult();
    this.addBackgroundClickBlock();
  }

  public getIndexFirstNotResolved(): number {
    return Array.from(document.querySelectorAll('.field-result__line'))
      .map((el) => el.classList.contains('solution'))
      .indexOf(false);
  }

  public setClickField(text: string): void {
    const arrText = this.shuffleArr(text);
    const fieldClick = document.querySelector('.main__field-click');
    const widthBlockClick = 768 / arrText.length;

    this.addBlocksFieldResult(arrText.length, widthBlockClick);

    for (let index = 0; index < arrText.length; index += 1) {
      const element = new ElementCreation(blockClickParams);
      element.setText(arrText[index]);
      element.getElement()!.style.width = `${widthBlockClick}px`;
      element.getElement()?.setAttribute('draggable', 'true');
      fieldClick?.append(element.getElement()!);
    }
  }

  public addBlocksFieldResult(count: number, width: number): void {
    const lines = Array.from(document.querySelectorAll('.field-result__line'));

    for (let index = 0; index < count; index += 1) {
      const element = new ElementCreation(blockParams);
      element.getElement()!.style.width = `${width}px`;
      lines[this.getIndexFirstNotResolved()].append(element.getElement()!);
    }
  }

  public shuffleArr(str: string): string[] {
    const arrText = str.split(' ');

    for (let index = arrText.length - 1; index > 0; index -= 1) {
      const num = Math.floor(Math.random() * (index + 1));
      [arrText[index], arrText[num]] = [arrText[num], arrText[index]];
    }

    return arrText;
  }

  public setAttributeResult(
    level: number,
    rounds: number,
    currentWords: number,
    countRounds: number,
  ): void {
    const fieldResult = document.querySelector('.main__field-result');
    fieldResult?.setAttribute('data-level', `${level}`);
    fieldResult?.setAttribute('data-round', `${rounds}`);
    fieldResult?.setAttribute('data-currentWords', `${currentWords}`);
    fieldResult?.setAttribute('data-countRounds', `${countRounds}`);
  }

  public addClassItemClick(): void {
    const total: HTMLElement = Array.from(document.querySelectorAll('.field-total__line'))[
      Number(document.querySelector('.main__field-result')?.getAttribute('data-currentwords'))
    ] as HTMLElement;
    const totalArr: string[] = total.textContent?.split(' ') as string[];
    const first: string = totalArr[0] as string;
    const last: string = totalArr.at(-1) as string;
    const clickBlock: HTMLElement[] = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];
    clickBlock.find((el) => el.textContent === first)?.classList.add('first-item');
    clickBlock.find((el) => el.textContent === last)?.classList.add('last-item');
  }

  public addBackgroundResult(): void {
    const levelSentences = Object.values(sentences);
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const level = Number(fieldResult.getAttribute('data-level'));
    const round = Number(fieldResult.getAttribute('data-round'));
    const urlImage = levelSentences[level].rounds[round].levelData.cutSrc;

    fieldResult.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${urlImage})`;
  }

  public addBackgroundClickBlock(): void {
    const levelSentences = Object.values(sentences);
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const level = Number(fieldResult.getAttribute('data-level'));
    const round = Number(fieldResult.getAttribute('data-round'));
    const currentWord = Number(fieldResult.getAttribute('data-currentwords'));
    const clickBlocks = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];
    const arrTotal: string[] =
      levelSentences[level].rounds[round].words[currentWord].textExample.split(' ');
    const width: number = parseInt(clickBlocks[0].style.width, 10);
    const height = 40 * currentWord;
    const lineResult = Array.from(document.querySelectorAll('.field-result__line'))[
      currentWord
    ] as HTMLElement;
    const lineBlocksResult = Array.from(lineResult.children) as HTMLElement[];

    clickBlocks.forEach((element, index) => {
      const el = element;
      const indexEl = arrTotal.findIndex((text) => text === el.textContent);
      el.style.backgroundPosition = `${-width * indexEl}px ${-height}px`;
      arrTotal[indexEl] = '';
      lineBlocksResult[index].style.backgroundPosition = `${-width * index}px ${-height}px`;
    });

    this.showBackgroundBlock();
  }

  public showBackgroundBlock(): void {
    const imageHelp = document.querySelector('.text-help__image') as HTMLElement;
    const levelSentences = Object.values(sentences);
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const level = Number(fieldResult.getAttribute('data-level'));
    const round = Number(fieldResult.getAttribute('data-round'));
    const clickBlocks = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];
    const urlImage = levelSentences[level].rounds[round].levelData.cutSrc;
    const continueButton = document.querySelector('.field-buttons__check-continue') as HTMLElement;

    if (continueButton.textContent === 'Continue') {
      const currentWord = Number(fieldResult.getAttribute('data-currentwords'));
      const lineSolution = Array.from(document.querySelectorAll('.field-result__line'))[
        currentWord
      ] as HTMLElement;
      const block = Array.from(lineSolution.children) as HTMLElement[];
      block.forEach((el) => {
        const element = el;
        element.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${urlImage})`;
      });
    }

    clickBlocks.forEach((element) => {
      const el = element;
      if (imageHelp.classList.contains('active')) {
        el.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${urlImage})`;
      } else {
        el.style.backgroundImage = ``;
      }
    });
  }
}
