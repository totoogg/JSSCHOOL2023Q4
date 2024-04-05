import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import Listener from '../listener';

export default class KeyboardStartForm extends Listener {
  public eventListener: string;

  private formStart = new ManipulationFormStart();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    const valueName = this.formStart.getNameValue();
    const valuePassword = this.formStart.getPasswordValue();
    let letterUpper: boolean = false;
    let letterLower: boolean = false;

    valuePassword.split('').forEach((el) => {
      if (Number.isNaN(Number(el))) {
        if (!letterUpper) letterUpper = el.toUpperCase() === el;
        if (!letterLower) letterLower = el.toLowerCase() === el;
      }
    });

    if (valueName.length <= 4) {
      this.formStart.visibilityNameError(true);
    } else {
      this.formStart.visibilityNameError(false);
    }

    if (valuePassword.length <= 4 || !letterLower || !letterUpper) {
      this.formStart.visibilityPasswordError(true);
    } else {
      this.formStart.visibilityPasswordError(false);
    }

    if (
      !this.formStart.checkVisibilityError() &&
      this.formStart.getNameValue() &&
      this.formStart.getPasswordValue()
    ) {
      this.formStart.buttonLogin();
    } else {
      this.formStart.buttonLogin('disable');
    }
  }
}
