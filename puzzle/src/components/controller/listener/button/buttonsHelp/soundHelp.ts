import Listener from '../../listener';
import * as sentences from '../../../../model/data/wordCollection';
import { ISoundHelpButton, IUserSave } from '../../../../interfaces/interfaces';

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

    if (currentElement.classList.contains('text-help__sound')) {
      const buttonSound = document.querySelector('.field-help__sound-help') as HTMLElement;
      buttonSound.classList.toggle('hide');
      currentElement.classList.toggle('active');
      this.saveState();
    }
  }

  public showSound(): void {
    const soundHelp = document.querySelector('.text-help__sound') as HTMLElement;
    const sound = document.querySelector('.field-help__sound-help') as HTMLElement;

    if (soundHelp.classList.contains('active')) {
      sound.classList.remove('hide');
    }
  }

  public endedSound(element: HTMLElement): void {
    this.sound.addEventListener('ended', () => {
      element.classList.remove('play');
    });
  }

  public saveState(): void {
    const soundButton = document.querySelector('.text-help__sound') as HTMLElement;
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const index = localData.findIndex((el) => el.login);

    if (soundButton.classList.contains('active')) {
      localData[index].soundHelp = true;
    } else {
      localData[index].soundHelp = false;
    }

    localStorage.setItem('rssPuzzleUsersTotooggJSFE2023Q4', JSON.stringify(localData));
  }
}
