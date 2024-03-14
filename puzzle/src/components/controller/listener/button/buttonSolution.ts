import FieldResult from '../../fieldGame/fieldResult';
import Listener from '../listener';
import { IButtonSolution, ITranslate } from '../../../interfaces/interfaces';

export default class ButtonSolution extends Listener implements IButtonSolution {
  public eventListener: string;

  public game = new FieldResult();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;
    const currentWord = Number(fieldResult.getAttribute('data-currentwords'));
    const solution = document
      .querySelectorAll('.field-total__line')
      [currentWord].textContent!.split(' ') as string[];
    const solutionLineBlock = Array.from(
      document.querySelectorAll('.line__block:not(.properly)'),
    ) as HTMLElement[];
    const clickBlocks = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];
    const solutionLine = Array.from(document.querySelectorAll('.field-result__line'))[currentWord];
    solutionLine.setAttribute('data-solution', 'resolution');

    clickBlocks.forEach((el) => el.removeAttribute('data-index'));

    solutionLineBlock.forEach((el, index) => {
      const element = el;
      element.textContent = solution[index];
      const coordinatesClickBlock = clickBlocks.find(
        (block) => block.textContent === solution[index] && !block.getAttribute('data-index'),
      ) as HTMLElement;
      const correctCord = this.getCoordinate(element, coordinatesClickBlock);
      coordinatesClickBlock.style.transform = `translate(${correctCord.scrollX}px, ${correctCord.scrollY}px)`;
      coordinatesClickBlock.classList.add('add');
      coordinatesClickBlock.setAttribute('data-index', `${index}`);
    });

    this.updateButtonContinue();
  }

  public getCoordinate(el: HTMLElement, block: HTMLElement): ITranslate {
    const coordinatesClickBlock = block.getBoundingClientRect();
    const coordinatesElement = el.getBoundingClientRect();
    let transformBlock: number[];

    if (block.style.transform) {
      transformBlock = block.style.transform
        .slice(10, -1)
        .split(', ')
        .map((coord) => parseInt(coord, 10));
    } else {
      transformBlock = [0, 0];
    }

    const topElement = coordinatesElement.top + window.scrollY;
    const leftElement = coordinatesElement.left + window.scrollX;
    const topClickBlock = coordinatesClickBlock.top + window.scrollY;
    const leftClickBlock = coordinatesClickBlock.left + window.scrollX;

    const translate: ITranslate = {
      scrollY: topElement - topClickBlock + transformBlock[1],
      scrollX: leftElement - leftClickBlock + transformBlock[0],
    };

    return translate;
  }

  public updateButtonContinue(): void {
    const textHelp = document.querySelector('.field-help__text-help') as HTMLElement;
    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;

    textHelp.classList.remove('hide');
    button.textContent = 'Continue';
    button.classList.remove('display-none');
  }
}
