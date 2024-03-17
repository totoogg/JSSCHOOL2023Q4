import Listener from '../listener';
import { IButtonResult } from '../../../interfaces/interfaces';
import ElementCreation from '../../../view/util/element-creation';

export default class ButtonResult extends Listener implements IButtonResult {
  public eventListener: string;

  public line = new ElementCreation({
    tag: 'div',
    classNames: ['line'],
    textContent: ``,
    action: null,
  });

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.hideElements();
    this.createLine();
    this.getResultText();
  }

  public hideElements(): void {
    const body = document.querySelector('body') as HTMLElement;
    const child = Array.from(body.children);

    body.classList.add('background');

    child.forEach((el) => {
      if (!el.classList.contains('total')) {
        el.classList.add('display-none');
      } else {
        el.classList.remove('display-none');
      }
    });
  }

  public getResultText(): void {
    const total = Array.from(document.querySelectorAll('.field-total__line')).map(
      (el) => el.textContent,
    );
    const totalResult = Array.from(document.querySelectorAll('.field-result__line')).map((el) =>
      el.getAttribute('data-solution'),
    );
    const notKnow = document.querySelector('.result__not-know') as HTMLElement;
    const know = document.querySelector('.result__know') as HTMLElement;

    total.forEach((el, index) => {
      const element = this.line.getElement()!.cloneNode(true);
      element.lastChild!.textContent = el;

      if (totalResult[index]) {
        notKnow.append(element);
      } else {
        know.append(element);
      }
    });
  }

  public createLine(): void {
    const sound = new ElementCreation({
      tag: 'div',
      classNames: ['line__sound'],
      textContent: ``,
      action: null,
    });
    const text = new ElementCreation({
      tag: 'div',
      classNames: ['line__text'],
      textContent: ``,
      action: null,
    });

    this.line.getElement()?.append(sound.getElement()!, text.getElement()!);
  }
}
