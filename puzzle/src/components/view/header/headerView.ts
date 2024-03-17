import ElementCreation from '../util/element-creation';
import { IHTMLElement, IParams } from '../../interfaces/interfaces';
import {
  blocksHelpParams,
  buttonLogoutParams,
  imageHelpButtonParams,
  selectBlockParams,
  selectLevelChoiceParams,
  selectLevelOptionParams,
  selectLevelParams,
  selectLevelTextParams,
  selectPageChoiceParams,
  selectPageParams,
  selectPageTextParams,
  soundHelpButtonParams,
  textHelpButtonParams,
} from '../util/params';

import './headerView.scss';

export default class HeaderView implements IHTMLElement {
  public header: ElementCreation;

  private buttonLogout: ElementCreation = new ElementCreation(buttonLogoutParams);

  private blocksHelp: ElementCreation = new ElementCreation(blocksHelpParams);

  private blocksSelect: ElementCreation = new ElementCreation(selectBlockParams);

  constructor(param: IParams) {
    this.header = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.header) {
      return this.header;
    }
    return null;
  }

  public createElements(): void {
    this.header
      .getElement()
      ?.append(
        this.blocksSelect.getElement()!,
        this.buttonLogout.getElement()!,
        this.blocksHelp.getElement()!,
      );
    this.createButtonsHelp();
    this.createSelectBlock();
  }

  private createButtonsHelp(): void {
    const textHelp = new ElementCreation(textHelpButtonParams);
    const soundHelp = new ElementCreation(soundHelpButtonParams);
    const imageHelp = new ElementCreation(imageHelpButtonParams);

    this.blocksHelp
      .getElement()
      ?.append(textHelp.getElement()!, soundHelp.getElement()!, imageHelp.getElement()!);
  }

  private createSelectBlock(): void {
    const level = new ElementCreation(selectLevelParams);
    const page = new ElementCreation(selectPageParams);
    const levelText = new ElementCreation(selectLevelTextParams);
    const pageText = new ElementCreation(selectPageTextParams);
    const levelSelect = new ElementCreation(selectLevelChoiceParams);
    const pageSelect = new ElementCreation(selectPageChoiceParams);
    const element = new ElementCreation(selectLevelOptionParams);

    for (let index = 0; index < 6; index += 1) {
      const copyElement = element.getElement()!.cloneNode(true) as HTMLElement;
      copyElement.textContent = `${index + 1}`;
      copyElement.setAttribute('value', `${index}`);
      levelSelect.getElement()?.append(copyElement);
    }

    level.getElement()?.append(levelText.getElement()!, levelSelect.getElement()!);
    page.getElement()?.append(pageText.getElement()!, pageSelect.getElement()!);
    this.blocksSelect.getElement()?.append(level.getElement()!, page.getElement()!);
  }
}
