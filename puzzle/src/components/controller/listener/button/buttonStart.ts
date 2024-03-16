import Listener from '../listener';
import FieldResult from '../../fieldGame/fieldResult';
import * as sentences from '../../../model/data/wordCollection';
import SoundHelpButton from './buttonsHelp/soundHelp';
import ElementCreation from '../../../view/util/element-creation';
import { IButtonStart, IUserSave } from '../../../interfaces/interfaces';
import { selectPageOptionParams } from '../../../view/util/params';

export default class ButtonStart extends Listener implements IButtonStart {
  public eventListener: string;

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const childrenBody: Element[] = Array.from(document.body.children);
    const blockHelp = document.querySelector('.header__block-help') as HTMLElement;
    const body = document.querySelector('body');

    body?.classList.remove('background');
    blockHelp.classList.remove('display-none');

    childrenBody.forEach((el) => {
      if (el.classList.contains('header') || el.classList.contains('main')) {
        el.classList.remove('display-none');
      } else {
        el.classList.add('display-none');
      }
    });

    const start = new FieldResult();

    this.settingHelps();
    start.setSentence(0, 0, 0);
    this.textHelp();
    this.settingSelect();
  }

  public textHelp(): void {
    const text = Object.values(sentences);
    const currentResult = document.querySelector('.main__field-result') as HTMLElement;
    const currentText: string =
      text[Number(currentResult.getAttribute('data-level'))].rounds[
        Number(currentResult.getAttribute('data-round'))
      ].words[Number(currentResult.getAttribute('data-currentwords'))].textExampleTranslate;
    const textHelpBlock = document.querySelector('.field-help__text-help') as HTMLElement;
    textHelpBlock.textContent = currentText;
  }

  public settingHelps(): void {
    const localData: IUserSave[] = JSON.parse(
      localStorage.getItem('rssPuzzleUsersTotooggJSFE2023Q4')!,
    );
    const index = localData.findIndex((el) => el.login);

    if (localData[index].imageHelp) {
      const help = document.querySelector('.text-help__image') as HTMLElement;
      help.classList.add('active');
    }

    if (localData[index].textHelp) {
      const help = document.querySelector('.text-help__text') as HTMLElement;
      const helpText = document.querySelector('.field-help__text-help') as HTMLElement;
      help.classList.add('active');
      helpText.classList.remove('hide');
    }

    if (localData[index].soundHelp) {
      const help = document.querySelector('.text-help__sound') as HTMLElement;
      help.classList.add('active');
      const sound = new SoundHelpButton('click');
      sound.showSound();
    }
  }

  public settingSelect(): void {
    const text = Object.values(sentences);
    const selectBlock = document.querySelector('.header__select-block') as HTMLElement;
    const levelSelect = document.querySelector('.level__choice') as HTMLElement;
    const pageSelect = document.querySelector('.page__choice') as HTMLElement;
    const fieldResult = document.querySelector('.main__field-result') as HTMLElement;

    const countWord = Number(fieldResult.getAttribute('data-countrounds'));

    for (let index = 0; index < countWord; index += 1) {
      const element = new ElementCreation(selectPageOptionParams);
      element.getElement()!.textContent = `${index + 1}`;
      element.getElement()!.setAttribute('value', `${index}`);
      pageSelect.append(element.getElement()!);
    }

    selectBlock.classList.remove('display-none');
  }
}
