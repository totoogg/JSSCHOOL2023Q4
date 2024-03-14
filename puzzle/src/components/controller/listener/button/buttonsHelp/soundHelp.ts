import Listener from '../../listener';
import * as sentences from '../../../../model/data/wordCollection';
import { ISoundHelpButton } from '../../../../interfaces/interfaces';

export default class SoundHelpButton extends Listener implements ISoundHelpButton {
  public eventListener: string;

  public sound!: HTMLAudioElement;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const currentElement = event.target as HTMLElement;
    const sound = Object.values(sentences);
    const currentResult = document.querySelector('.main__field-result') as HTMLElement;
    const currentSound: string =
      sound[Number(currentResult.getAttribute('data-level'))].rounds[
        Number(currentResult.getAttribute('data-round'))
      ].words[Number(currentResult.getAttribute('data-currentwords'))].audioExample;
    this.sound = new Audio(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentSound}`,
    );
    this.endedSound(currentElement);

    if (
      currentElement.classList.contains('field-help__sound-help') &&
      !currentElement.classList.contains('hide')
    ) {
      currentElement.classList.add('play');
      this.sound.play();
    }
  }

  public endedSound(element: HTMLElement): void {
    this.sound.addEventListener('ended', () => {
      element.classList.remove('play');
    });
  }
}
