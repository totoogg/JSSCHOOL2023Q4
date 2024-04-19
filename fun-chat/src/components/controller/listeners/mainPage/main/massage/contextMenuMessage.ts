import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import { IAction } from '../../../../../interfaces/interfaces';

export default class ContextMenuMessage extends Listener implements IAction {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: MouseEvent): void {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const message = target.closest('.right');

    this.mainUsersThis.showActionMessage(false);
    this.mainUsersThis.writeIdActionMessage('');

    if (this.eventListener === 'mousedown' && event.button === 2) {
      this.mainUsersThis.overBlockActionMessage(event.clientX, event.clientY);
    }

    if (
      this.eventListener === 'contextmenu' &&
      message &&
      (!this.mainUsersThis.getIdActionMessage() ||
        this.mainUsersThis.getIdActionMessage() !== message!.getAttribute('data-id')!)
    ) {
      this.mainUsersThis.selectMessage(message!.getAttribute('data-id')!);
      this.mainUsersThis.showActionMessage(true);
      this.mainUsersThis.writeIdActionMessage(message!.getAttribute('data-id')!);
    }
  }
}
