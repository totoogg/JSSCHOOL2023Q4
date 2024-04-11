import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  footerSchoolLinkParams,
  footerSchoolLogoParams,
  footerNameParams,
  footerYearParams,
} from '../../util/params';

import './mainFooter.scss';

export default class MainFooter implements IHTMLElement {
  public mainFooter: ElementCreation;

  private link = new ElementCreation(footerSchoolLinkParams);

  private image = new ElementCreation(footerSchoolLogoParams);

  private name = new ElementCreation(footerNameParams);

  private year = new ElementCreation(footerYearParams);

  constructor(param: IParams) {
    this.mainFooter = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.mainFooter) {
      return this.mainFooter;
    }
    return null;
  }

  public createElements(): void {
    this.createLogo();
    this.createLink();

    this.mainFooter
      .getElement()!
      .append(this.link.getElement()!, this.name.getElement()!, this.year.getElement()!);
  }

  private createLink(): void {
    const link = this.name.getElement()!;
    link.setAttribute('href', 'https://github.com/totoogg');
  }

  private createLogo(): void {
    const link = this.link.getElement()!;
    const image = this.image.getElement()!;

    link.setAttribute('href', 'https://rs.school/');

    link.append(image);
  }
}
