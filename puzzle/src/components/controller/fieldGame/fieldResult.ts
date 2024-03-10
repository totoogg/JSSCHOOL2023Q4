import sentences from '../../model/data/wordCollectionLevel6.json';
import ElementCreation from '../../view/util/element-creation';
import { IFieldResult } from '../../interfaces/interfaces';
import { blockClickParams, blockParams } from '../../view/util/params';

export default class FieldResult implements IFieldResult {
  public setSentence(): void {
    const current = sentences.rounds[22].words;

    const linesTotal = Array.from(document.querySelectorAll('.field-total__line')) as Element[];

    linesTotal.forEach((el, index) => {
      const element = el;
      element.textContent = current[index].textExample;
    });

    this.setClickField(linesTotal[8].textContent!);
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
}
