import sentences1 from '../../model/data/wordCollectionLevel1.json';
import sentences2 from '../../model/data/wordCollectionLevel2.json';
import sentences3 from '../../model/data/wordCollectionLevel3.json';
import sentences4 from '../../model/data/wordCollectionLevel4.json';
import sentences5 from '../../model/data/wordCollectionLevel5.json';
import sentences6 from '../../model/data/wordCollectionLevel6.json';
import ElementCreation from '../../view/util/element-creation';
import { IFieldResult } from '../../interfaces/interfaces';
import { blockClickParams, blockParams } from '../../view/util/params';

export default class FieldResult implements IFieldResult {
  public setSentence(level: number, rounds: number, currentWords: number): void {
    const levelSentences = [sentences1, sentences2, sentences3, sentences4, sentences5, sentences6];

    const current = levelSentences[level].rounds[rounds].words;
    const countRounds = levelSentences[level].roundsCount;

    this.setAttributeResult(level, rounds, currentWords, countRounds);

    const linesTotal = Array.from(document.querySelectorAll('.field-total__line')) as Element[];

    linesTotal.forEach((el, index) => {
      const element = el;
      element.textContent = current[index].textExample;
    });

    this.setClickField(linesTotal[currentWords].textContent!);
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
      element.getElement()!.style.width = `${Math.floor(widthBlockClick)}px`;
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
}
