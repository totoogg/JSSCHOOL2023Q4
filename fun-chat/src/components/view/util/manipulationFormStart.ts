import Unit from '../../controller/listeners/unit';

export default class ManipulationFormStart extends Unit {
  public getNameValue(): string {
    const name = document.querySelector('.name__input') as HTMLInputElement;

    return name.value;
  }

  public visibilityNameError(bool: boolean): void {
    const name = document.querySelector('.name__input') as HTMLInputElement;
    const error = document.querySelector('.error-name') as HTMLDivElement;

    if (bool) {
      name.classList.add('input-error');
      error.classList.add('visibility');
    } else {
      name.classList.remove('input-error');
      error.classList.remove('visibility');
    }
  }

  public getPasswordValue(): string {
    const password = document.querySelector('.password__input') as HTMLInputElement;

    return password.value;
  }

  public checkButton(): boolean {
    const button = document.querySelector('.buttons__login') as HTMLButtonElement;

    return button.classList.contains('disable');
  }

  public visibilityPasswordError(bool: boolean): void {
    const password = document.querySelector('.password__input') as HTMLInputElement;
    const error = document.querySelector('.error-password') as HTMLDivElement;

    if (bool) {
      password.classList.add('input-error');
      error.classList.add('visibility');
    } else {
      password.classList.remove('input-error');
      error.classList.remove('visibility');
    }
  }

  public checkVisibilityError(): boolean {
    const error = document.querySelector('.error-name') as HTMLDivElement;
    const password = document.querySelector('.error-password') as HTMLDivElement;

    if (error.classList.contains('visibility') || password.classList.contains('visibility')) {
      return true;
    }

    return false;
  }

  public buttonLogin(but?: string): void {
    const button = document.querySelector('.buttons__login') as HTMLButtonElement;

    if (!but) {
      button.classList.remove('disable');
    }

    if (typeof but === 'string') {
      button.classList.add(but);
    }
  }

  public hiddenFormStart(): void {
    const form = document.querySelector('.form') as HTMLFormElement;

    form.classList.add('display-none');
  }

  public showError(text: string): void {
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
    const error = document.querySelector('.error') as HTMLDivElement;
    const textError = error.querySelector('.error__text') as HTMLParagraphElement;

    textError.textContent = text;

    wrapper.classList.remove('display-none');
    error.classList.remove('display-none');
  }

  public hiddenError(): void {
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
    const error = document.querySelector('.error') as HTMLDivElement;

    wrapper.classList.add('display-none');
    error.classList.add('display-none');
  }

  public showInfo(): void {
    const info = document.querySelector('.info') as HTMLDivElement;
    const body = document.querySelector('body') as HTMLBodyElement;
    Array.from(body.children).forEach((el) => {
      if (!el.classList.contains('info') && !el.classList.contains('display-none')) {
        el.setAttribute('data-display', 'none');
        el.classList.add('display-none');
      }
    });

    info.classList.remove('display-none');
  }

  public hiddenInfo(): void {
    const info = document.querySelector('.info') as HTMLDivElement;
    const body = document.querySelector('body') as HTMLBodyElement;
    Array.from(body.children).forEach((el) => {
      if (el.getAttribute('data-display') === 'none') {
        el.classList.remove('display-none');
        el.removeAttribute('data-display');
      }
    });

    info.classList.add('display-none');
  }
}
