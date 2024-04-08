import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Work from '../../../workWithServer';

export default class ClickUser extends Work {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    const target = event.target as HTMLElement;
    const parent = target.parentElement as HTMLDivElement;

    if (parent.classList.contains('content__user')) {
      const status = !parent.children[0].classList.contains('offline');
      const name = parent.children[1].textContent;
      const nameFull = parent.children[1].getAttribute('data-login');

      this.mainUsersThis.selectUser(status, name!, nameFull);
    }
  }
}
