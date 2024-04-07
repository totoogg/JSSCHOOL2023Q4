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
}
