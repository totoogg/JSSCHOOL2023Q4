import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Work from '../workWithServer';

export default class KeyboardStartForm extends Work {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const valueName = this.formStartThis.getNameValue();
    const valuePassword = this.formStartThis.getPasswordValue();
    let letterUpper: boolean = false;
    let letterLower: boolean = false;

    valuePassword.split('').forEach((el) => {
      if (Number.isNaN(Number(el))) {
        if (!letterUpper) letterUpper = el.toUpperCase() === el;
        if (!letterLower) letterLower = el.toLowerCase() === el;
      }
    });

    if (valueName.length <= 4) {
      this.formStartThis.visibilityNameError(true);
    } else {
      this.formStartThis.visibilityNameError(false);
    }

    if (valuePassword.length <= 4 || !letterLower || !letterUpper) {
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
}
