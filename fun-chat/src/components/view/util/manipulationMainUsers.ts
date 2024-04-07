import Unit from '../../controller/listeners/unit';

export default class ManipulationMainUsers extends Unit {
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

  public sortUsers(): void {
    const users = Array.from(
      document.getElementsByClassName('content__user'),
    ) as HTMLParagraphElement[];

    users.sort((a) => (a.children[0].classList.contains('offline') ? 1 : -1));
  }

  public changeUserStatusOffline(user: string): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      if (el.textContent === user) {
        el.classList.add('online');
        el.classList.remove('offline');
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

  public updateUser(user: string, bool: boolean): void {
    const name = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const att = name.getAttribute('data-login');

    if (att && att === user) {
      this.updateStatus(bool);
    }

    if (name.textContent === user) {
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
}
