import ElementCreation from '../util/element-creation';
import { IHeaderView, IParams } from '../../interfaces/interfaces';
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

export default class HeaderView implements IHeaderView {
  public header: ElementCreation;

  public buttonLogout: ElementCreation = new ElementCreation(buttonLogoutParams);

  public blocksHelp: ElementCreation = new ElementCreation(blocksHelpParams);

  public blocksSelect: ElementCreation = new ElementCreation(selectBlockParams);

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

  public createButtonsHelp(): void {
    for (let index = 0; index < 3; index += 1) {
      let element: ElementCreation;
      if (index === 0) {
        element = new ElementCreation(textHelpButtonParams);
      }
      if (index === 1) {
        element = new ElementCreation(soundHelpButtonParams);
      }
      if (index === 2) {
        element = new ElementCreation(imageHelpButtonParams);
      }
      this.blocksHelp.getElement()?.append(element!.getElement()!);
    }
  }

  public createSelectBlock(): void {
    const level = new ElementCreation(selectLevelParams);
    const page = new ElementCreation(selectPageParams);
    const levelText = new ElementCreation(selectLevelTextParams);
    const pageText = new ElementCreation(selectPageTextParams);
    const levelSelect = new ElementCreation(selectLevelChoiceParams);
    const pageSelect = new ElementCreation(selectPageChoiceParams);

    for (let index = 0; index < 6; index += 1) {
      const element = new ElementCreation(selectLevelOptionParams);
      element.getElement()!.textContent = `${index + 1}`;
      element.getElement()!.setAttribute('value', `${index}`);
      levelSelect.getElement()?.append(element.getElement()!);
    }

    level.getElement()?.append(levelText.getElement()!, levelSelect.getElement()!);
    page.getElement()?.append(pageText.getElement()!, pageSelect.getElement()!);
    this.blocksSelect.getElement()?.append(level.getElement()!, page.getElement()!);
  }
}
