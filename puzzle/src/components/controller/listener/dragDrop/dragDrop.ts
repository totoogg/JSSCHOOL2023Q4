import ClickBlock from '../button/clickBlock';
import { IDragDrop } from '../../../interfaces/interfaces';

export default class DragDrop extends ClickBlock implements IDragDrop {
  public eventListener: string;

  constructor(key: string) {
    super(key);
    this.eventListener = key;
  }

  public callback(event: Event): void {
    const target = event.target as HTMLElement;

    if (this.eventListener === 'dragstart') {
      target.classList.add(`selected`);

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

    if (this.eventListener === 'dragend') {
      this.findChangeElements(event);
      this.writeLineBlock(event);
      target.classList.remove(`selected`);

      if (!this.getEmptyPlace()) {
        this.checkingResult();
      }
    }

    if (this.eventListener === 'dragover') {
      event.preventDefault();
      this.findBlock(event);
    }
  }

  public findChangeElements(event: Event): void {
    const clickBlock = event.target as HTMLElement;
    const currentElement = document.querySelector('.line__block[data-drop]') as HTMLElement;
    const el = document.querySelector('.main__field-click[data-drop]') as HTMLElement;
    const changeClickBlock = document.querySelector(
      '.field-click__block[data-drop]',
    ) as HTMLElement;

    if (currentElement && !currentElement.classList.contains('properly')) {
      this.updateCoordinateChangeElements(currentElement, clickBlock);

      clickBlock.classList.add('add');
    } else if (el) {
      clickBlock.style.transform = `translate(0px, 0px)`;
      clickBlock.classList.remove('add');
    } else if (changeClickBlock) {
      if (changeClickBlock.getAttribute('data-index') && clickBlock.getAttribute('data-index')) {
        this.changeAttBlocks(changeClickBlock, clickBlock);
      } else if (changeClickBlock.getAttribute('data-index')) {
        this.changeAttBlocksResultClick(changeClickBlock, clickBlock);
      } else if (clickBlock.getAttribute('data-index')) {
        this.changeAttBlocksResultClick(clickBlock, changeClickBlock);
      }
      this.updateCoordinateChangeElements(changeClickBlock, clickBlock);
      this.updateCoordinateChangeElements(clickBlock, changeClickBlock);
    }
  }

  public findBlock(event: Event): void {
    const blockClick = document.querySelector('.selected') as HTMLElement;
    const emptyPlace = Array.from(document.querySelectorAll('.line__block')) as HTMLElement[];
    const clickBlocks = Array.from(
      document.querySelectorAll('.field-click__block'),
    ) as HTMLElement[];
    const currentElement = event.target as HTMLElement;
    const fieldClick = document.querySelector('.main__field-click') as HTMLElement;
    clickBlocks.forEach((el) => el.removeAttribute('data-drop'));
    emptyPlace.forEach((el) => el.removeAttribute('data-drop'));
    fieldClick.removeAttribute('data-drop');
    if (
      currentElement &&
      currentElement.classList.contains('line__block') &&
      !currentElement.classList.contains('properly')
    ) {
      currentElement.setAttribute('data-drop', 'yes');
    } else if (currentElement.classList.contains('main__field-click')) {
      if (blockClick && blockClick.getAttribute('data-index')) {
        emptyPlace[Number(blockClick.getAttribute('data-index'))].textContent = '';
      }
      currentElement.setAttribute('data-drop', 'yes');
      currentElement.removeAttribute('data-index');
    } else if (currentElement.classList.contains('field-click__block')) {
      currentElement.setAttribute('data-drop', 'yes');
    }
  }

  public writeLineBlock(event: Event): void {
    const currentElement = document.querySelector('.line__block[data-drop]') as HTMLElement;
    const clickBlock = event.target as HTMLElement;
    if (currentElement) {
      const index = Array.from(document.querySelectorAll('.line__block:not(.properly)')).indexOf(
        currentElement,
      );
      clickBlock.setAttribute('data-index', `${index}`);
      currentElement.textContent = clickBlock.textContent;
    }
  }

  public updateCoordinateChangeElements(
    currentElement: HTMLElement,
    currentClick: HTMLElement,
  ): void {
    const clickBlock = currentClick;
    const lineBlockCoord = currentElement.getBoundingClientRect();
    const clickBlockCoord = clickBlock.getBoundingClientRect();
    const topLineBlock = lineBlockCoord.top + window.scrollY;
    const leftLineBlock = lineBlockCoord.left + window.scrollX;
    const topClickBlock = clickBlockCoord.top + window.scrollY;
    const leftClickBlock = clickBlockCoord.left + window.scrollX;

    let transformBlock: number[];

    if (clickBlock.style.transform) {
      transformBlock = clickBlock.style.transform
        .slice(10, -1)
        .split(', ')
        .map((coord) => parseInt(coord, 10));
    } else {
      transformBlock = [0, 0];
    }

    clickBlock.style.transform = `translate(${leftLineBlock - leftClickBlock + transformBlock[0]}px, ${topLineBlock - topClickBlock + transformBlock[1]}px)`;
  }

  public changeAttBlocks(currentElement: HTMLElement, blockClick: HTMLElement): void {
    const emptyPlace = Array.from(document.querySelectorAll('.line__block')) as HTMLElement[];
    const att = [currentElement.getAttribute('data-index'), blockClick.getAttribute('data-index')];
    blockClick.setAttribute('data-index', `${att[0]}`);
    currentElement.setAttribute('data-index', `${att[1]}`);
    emptyPlace[Number(blockClick.getAttribute('data-index'))].textContent =
      `${blockClick.textContent}`;
    emptyPlace[Number(currentElement.getAttribute('data-index'))].textContent =
      `${currentElement.textContent}`;
  }

  public changeAttBlocksResultClick(currentElement: HTMLElement, blockClick: HTMLElement): void {
    blockClick.setAttribute('data-index', `${currentElement.getAttribute('data-index')}`);
    currentElement.removeAttribute('data-index');
    const emptyPlace = Array.from(document.querySelectorAll('.line__block')) as HTMLElement[];
    emptyPlace[Number(blockClick.getAttribute('data-index'))].textContent =
      `${blockClick.textContent}`;
  }
}
