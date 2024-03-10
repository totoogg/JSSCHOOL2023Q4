import Listener from '../listener/listener';
import { IClickBlock, ITranslate } from '../../interfaces/interfaces';

export default class ClickBlock extends Listener implements IClickBlock {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (target.classList.contains('field-click__block')) {
      const translate = this.translateTarget(target);

      target.style.transform = `translate(${translate.scrollX}px, ${translate.scrollY}px)`;

      target.classList.toggle('add');

      this.writeInEmptyPlace(target);
    }
  }

  public translateTarget(el: HTMLElement): ITranslate {
    if (el.style.transform && el.style.transform !== `translate(0px, 0px)`) {
      return { scrollY: 0, scrollX: 0 };
    }

    const emptyPlace = this.getEmptyPlace();
    const coordinatesEmptyPlace = emptyPlace.getBoundingClientRect();
    const topEmptyPlace = coordinatesEmptyPlace.top + window.scrollY;
    const leftEmptyPlacet = coordinatesEmptyPlace.left + window.scrollX;

    const coordinatesEl = el.getBoundingClientRect();
    const topEl = coordinatesEl.top + window.scrollY;
    const leftEl = coordinatesEl.left + window.scrollX;

    const translate: ITranslate = {
      scrollY: topEmptyPlace - topEl,
      scrollX: leftEmptyPlacet - leftEl,
    };
    return translate;
  }

  public writeInEmptyPlace(el: HTMLElement): void {
    if (el.classList.contains('add')) {
      const emptyPlace = this.getEmptyPlace();
      emptyPlace.textContent = el.textContent;
    } else {
      const elResult = Array.from(document.querySelectorAll('.line__block')).find(
        (element) => element.textContent === el.textContent,
      ) as HTMLElement;
      elResult.textContent = '';
    }

    if (!this.getEmptyPlace()) {
      this.checkingResult();
    }
  }

  public getEmptyPlace(): HTMLElement {
    const emptyPlace = Array.from(document.querySelectorAll('.line__block')).find(
      (el) => !el.textContent,
    ) as HTMLElement;
    return emptyPlace;
  }

  checkingResult(): void {
    const resultLine = Array.from(document.querySelectorAll('.field-result__line'));
    const checkLineIndex = resultLine.filter((el) => el.children.length > 0).length - 1;
    const checkLine = Array.from(resultLine[checkLineIndex].children)
      .map((el) => el.textContent)
      .join(' ');
    const totalLine = Array.from(document.querySelectorAll('.field-total__line'))[checkLineIndex]
      .textContent;

    if (checkLine === totalLine) {
      const button = document.querySelector('.field-buttons__check-continue');
      button?.classList.remove('display-none');
    }
  }
}
