export default class ManipulationMainUsers {
  public activeButtonSendMessage(bool: boolean): void {
    const massageButton = document.querySelector('.footer__message-button') as HTMLButtonElement;

    if (bool) {
      massageButton.classList.remove('disable');
    } else {
      massageButton.classList.add('disable');
    }
  }

  public clearUsers(): void {
    const content = document.querySelector('.users__content') as HTMLDivElement;

    content.innerHTML = ``;
  }

  public clearInputMessage(): void {
    const content = document.querySelector('.footer__message-input') as HTMLInputElement;

    content.value = ``;
  }

  public getSearchUser(): string {
    const input = document.querySelector('.users__search') as HTMLInputElement;

    return input.value;
  }

  public getUsers(): (string | null)[] {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    return users.map((el) => el.textContent);
  }

  public showUsers(arr: (string | null)[]): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      if (arr.includes(el.textContent)) {
        el.parentElement!.classList.remove('display-none');
      } else {
        el.parentElement!.classList.add('display-none');
      }
    });
  }

  public checkUser(login: string): boolean {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];
    let result = false;

    users.forEach((el) => {
      const name = el.children[1];
      const att = name.getAttribute('data-login');
      if ((att && att === login) || name.textContent === login) {
        result = true;
      }
    });

    return result;
  }

  public updateStatusUser(login: string): void {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const name = el.children[1];
      const att = name.getAttribute('data-login');
      if ((att && att === login) || name.textContent === login) {
        el.children[0].classList.add('online');
        el.children[0].classList.remove('offline');
      }
    });
  }

  public sortUsers(): void {
    const block = document.querySelector('.users__content') as HTMLDivElement;
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const clone = el.cloneNode(true);

      if (el.children[0].classList.contains('online')) {
        block.prepend(clone);
      } else {
        block.append(clone);
      }

      el.remove();
    });
  }

  public changeUserStatusOffline(user: string): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      const att = el.getAttribute('data-login');

      if ((att && att === user) || el.textContent === user) {
        el.previousElementSibling!.classList.remove('online');
        el.previousElementSibling!.classList.add('offline');
      }
    });
  }

  public updateStatus(bool: boolean): void {
    const userStatus = document.querySelector('.header__status-user') as HTMLParagraphElement;

    if (bool) {
      userStatus.classList.remove('offline');
      userStatus.classList.add('online');
      userStatus.textContent = 'Online';
    } else {
      userStatus.classList.add('offline');
      userStatus.classList.remove('online');
      userStatus.textContent = 'Offline';
    }
  }

  public updateUserMessage(user: string, bool: boolean): void {
    const name = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const att = name.getAttribute('data-login');

    if ((att && att === user) || name.textContent === user) {
      this.updateStatus(bool);
    }
  }

  public selectUser(status: boolean, name: string, nameFull: string | null): void {
    const user = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const mainMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const massageInput = document.querySelector('.footer__message-input') as HTMLInputElement;

    user.textContent = name;
    massageInput.removeAttribute('disabled');
    mainMessage.textContent = `Write your first message...`;
    this.updateStatus(status);

    if (nameFull) {
      user.setAttribute('data-login', nameFull);
    } else {
      user.removeAttribute('data-login');
    }
  }

  public getMessageValue(): string {
    const message = document.querySelector('.footer__message-input') as HTMLInputElement;

    return message.value;
  }

  public buttonSend(but: boolean): void {
    const button = document.querySelector('.footer__message-button') as HTMLButtonElement;

    if (but) {
      button.classList.remove('disable');
    } else {
      button.classList.add('disable');
    }
  }
}
