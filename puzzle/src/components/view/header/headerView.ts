import ElementCreation from '../util/element-creation';
import { IHeaderView, IParams } from '../../interfaces/interfaces';
import {
  blocksHelpParams,
  buttonLogoutParams,
  imageHelpButtonParams,
  soundHelpButtonParams,
  textHelpButtonParams,
} from '../util/params';

import './headerView.scss';

export default class HeaderView implements IHeaderView {
  public header: ElementCreation;

  public buttonLogout: ElementCreation = new ElementCreation(buttonLogoutParams);

  public blocksHelp: ElementCreation = new ElementCreation(blocksHelpParams);

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
      ?.append(this.buttonLogout.getElement()!, this.blocksHelp.getElement()!);
    this.createButtonsHelp();
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
}
