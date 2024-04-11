import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IEventUnit } from '../../../../../interfaces/interfaces';

export default class ClickUser extends Listener {
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
      const messages: IEventUnit = {
        id: String(Date.now()),
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: nameFull || name!,
          },
        },
      };

      this.mainUsersThis.selectUser(status, name!, nameFull);
      this.mainUsersThis.clearInputMessage();

      this.sendServerData(messages);
    }
  }
}
