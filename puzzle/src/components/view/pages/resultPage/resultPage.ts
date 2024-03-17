import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  buttonTotalParams,
  descriptionImageParams,
  descriptionTextTotalParams,
  knowTitleParams,
  notKnowTitleParams,
  totalDescriptionParams,
  totalKnowParams,
  totalNotKnowParams,
  totalResultParams,
} from '../../util/params';

import './resultPage.scss';

export default class ResultPage implements IHTMLElement {
  public result: ElementCreation;

  private totalDescription: ElementCreation = new ElementCreation(totalDescriptionParams);

  private totalResult: ElementCreation = new ElementCreation(totalResultParams);

  private totalButtonContinue: ElementCreation = new ElementCreation(buttonTotalParams);

  constructor(param: IParams) {
    this.result = new ElementCreation(param);
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.result) {
      return this.result;
    }
    return null;
  }

  public createElements(): void {
    this.createDescription();
    this.createResult();

    this.result
      .getElement()
      ?.append(
        this.totalDescription.getElement()!,
        this.totalResult.getElement()!,
        this.totalButtonContinue.getElement()!,
      );
  }

  private createDescription(): void {
    const image = new ElementCreation(descriptionImageParams);
    const text = new ElementCreation(descriptionTextTotalParams);

    this.totalDescription.getElement()?.append(image.getElement()!, text.getElement()!);
  }

  private createResult(): void {
    const notKnow = new ElementCreation(totalNotKnowParams);
    const know = new ElementCreation(totalKnowParams);
    const notKnowTitle = new ElementCreation(notKnowTitleParams);
    const knowTitle = new ElementCreation(knowTitleParams);

    this.totalResult
      .getElement()
      ?.append(
        notKnowTitle.getElement()!,
        notKnow.getElement()!,
        knowTitle.getElement()!,
        know.getElement()!,
      );
  }
}
