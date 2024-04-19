import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';
import { IAction } from '../../../interfaces/interfaces';

export default class KeyboardStartForm extends Listener implements IAction {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    if (this.checkName()) {
      this.formStartThis.visibilityNameError(true);
    } else {
      this.formStartThis.visibilityNameError(false);
    }

    if (this.checkPassword()) {
      this.formStartThis.visibilityPasswordError(true);
    } else {
      this.formStartThis.visibilityPasswordError(false);
    }

    if (
      !this.formStartThis.checkVisibilityError() &&
      this.formStartThis.getNameValue() &&
      this.formStartThis.getPasswordValue()
    ) {
      this.formStartThis.buttonLogin();
    } else {
      this.formStartThis.buttonLogin('disable');
    }
  }

  private checkName(): boolean {
    const alphabet = 'AEIOUYBCDFGHJKLMNPQRSTVWXZaeiouybcdfghjklmnpqrstvwxz1234567890';
    const valueName = this.formStartThis.getNameValue();
    const arrName = valueName.split('');
    const arrNameFilter = arrName.filter((el) => !alphabet.includes(el));

    if (arrName.length <= 4 || arrNameFilter.length > 0) {
      return true;
    }

    return false;
  }

  private checkPassword(): boolean {
    const alphabet = 'AEIOUYBCDFGHJKLMNPQRSTVWXZaeiouybcdfghjklmnpqrstvwxz1234567890';
    const valuePassword = this.formStartThis.getPasswordValue();
    let letterUpper: boolean = false;
    let letterLower: boolean = false;
    const arrPassword = valuePassword.split('');
    const arrPasswordFilter = arrPassword.filter((el) => !alphabet.includes(el));

    arrPassword.forEach((el) => {
      if (Number.isNaN(Number(el))) {
        if (!letterUpper) letterUpper = el.toUpperCase() === el;
        if (!letterLower) letterLower = el.toLowerCase() === el;
      }
    });

    if (arrPassword.length <= 4 || !letterLower || !letterUpper || arrPasswordFilter.length > 0) {
      return true;
    }

    return false;
  }
}
