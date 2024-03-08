import { IElementCreation, IParams, IAction } from '../../interfaces/interfaces';

export default class ElementCreation implements IElementCreation {
  public element: null | HTMLElement;

  constructor(public param: IParams) {
    this.element = null;
    this.createElement(param);
  }

  public getElement(): HTMLElement | null {
    if (this.element) {
      return this.element;
    }
    return null;
  }

  public createElement(params: IParams): void {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setText(params.textContent);
    this.setAction(params.action);
  }

  public setCssClasses(classes: string[] = []): void {
    classes.forEach((cssClass) => {
      if (this.element) {
        this.element.classList.add(cssClass);
      }
    });
  }

  public setText(text: string = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  public setAction(action: IAction | null): void {
    if (action && typeof action.callback === 'function' && this.element) {
      this.element.addEventListener(action.eventListener, (event) => action.callback(event));
    }
  }
}
