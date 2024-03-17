import { IClickBlock } from './IClickBlock';

export interface IDragDrop extends IClickBlock {
  findChangeElements(event: Event): void;
  findBlock(event: Event): void;
  writeLineBlock(event: Event): void;
  updateCoordinateChangeElements(currentElement: HTMLElement, currentClick: HTMLElement): void;
  changeAttBlocks(currentElement: HTMLElement, blockClick: HTMLElement): void;
  changeAttBlocksResultClick(currentElement: HTMLElement, blockClick: HTMLElement): void;
}
