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
      const lineBlocks = Array.from(
        document.querySelectorAll('.line__block:not(.properly)'),
      ) as HTMLElement[];
      const emptyPlace = this.getEmptyPlace();
      el.setAttribute('data-index', `${lineBlocks.indexOf(emptyPlace)}`);
      emptyPlace.textContent = el.textContent;
    } else {
      const elResult = Array.from(document.querySelectorAll('.line__block')).find(
        (element) => element.textContent === el.textContent,
      ) as HTMLElement;
      elResult.textContent = '';
    }

    if (!this.getEmptyPlace()) {
      this.checkingResult();
    } else {
      const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;
      button.classList.add('display-none');
      button.textContent = 'Check';

      const clickBlock = Array.from(
        document.querySelectorAll('.field-click__block'),
      ) as HTMLElement[];

      clickBlock.forEach((element) => {
        element.classList.remove('right');
        element.classList.remove('wrong');
      });
    }
  }

  public getEmptyPlace(): HTMLElement {
    const emptyPlace = Array.from(document.querySelectorAll('.line__block')).find(
      (el) => !el.textContent,
    ) as HTMLElement;
    return emptyPlace;
  }

  public checkingResult(): void {
    const button = document.querySelector('.field-buttons__check-continue') as HTMLElement;
    button.classList.remove('display-none');
  }
}
