import ElementCreation from '../../util/element-creation';
import { IHTMLElement, IParams } from '../../../interfaces/interfaces';
import {
  userAuthenticationStatusParams,
  userAuthenticationNameParams,
  userAuthenticationMessageParams,
} from '../../util/params';

import './mainUsers.scss';

export default class MainUsers implements IHTMLElement {
  public mainUsers: ElementCreation;

  private status = new ElementCreation(userAuthenticationStatusParams);

  private name = new ElementCreation(userAuthenticationNameParams);

  private count = new ElementCreation(userAuthenticationMessageParams);

  private userStatus: boolean;

  private userName: string;

  private userCount: number;

  constructor(param: IParams, info: { status: boolean; name: string; count: number }) {
    this.mainUsers = new ElementCreation(param);
    this.userStatus = info.status;
    this.userName = info.name;
    this.userCount = info.count;
    this.createElements();
  }

  public getElement(): ElementCreation | null {
    if (this.mainUsers) {
      return this.mainUsers;
    }
    return null;
  }

  public createElements(): void {
    this.createUser();

    this.mainUsers
      .getElement()!
      .append(this.status.getElement()!, this.name.getElement()!, this.count.getElement()!);
  }

  private createUser(): void {
    if (this.userStatus) {
      this.status.setCssClasses(['online']);
    } else {
      this.status.setCssClasses(['offline']);
    }

    this.name.setText(this.userName);

    if (this.userCount > 0) {
      this.count.setText(String(this.userCount));
      this.count.setCssClasses(['unread']);
    }
  }
}
