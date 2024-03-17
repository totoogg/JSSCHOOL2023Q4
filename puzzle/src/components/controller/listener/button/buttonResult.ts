import Listener from '../listener';
import * as sentences from '../../../model/data/wordCollection';
import ElementCreation from '../../../view/util/element-creation';
import { IButtonResult } from '../../../interfaces/interfaces';

export default class ButtonResult extends Listener implements IButtonResult {
  public eventListener: string;

  public fieldResult!: HTMLElement;

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

    this.fieldResult = document.querySelector('.main__field-result') as HTMLElement;

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
    const sounds = this.getSound();

    total.forEach((el, index) => {
      const element = this.line.getElement()!.cloneNode(true);
      element.lastChild!.textContent = el;
      const sound = new Audio(
        `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${sounds[index]}`,
      );
      const currentAudio = element.firstChild! as HTMLElement;
      currentAudio.addEventListener('click', () => {
        currentAudio.classList.add('play');
        sound.play();
      });
      sound.addEventListener('ended', () => {
        currentAudio.classList.remove('play');
      });

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

  public getSound(): string[] {
    const text = Object.values(sentences);
    const level = Number(this.fieldResult.getAttribute('data-level'));
    const round = Number(this.fieldResult.getAttribute('data-round'));

    const sound = text[level].rounds[round].words.map((el) => el.audioExample);

    return sound;
  }
}
