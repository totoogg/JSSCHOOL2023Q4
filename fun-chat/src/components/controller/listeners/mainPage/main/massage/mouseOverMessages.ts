import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class MouseOverMessages extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.eventListener === 'mouseenter') {
      this.mainUsersThis.toggleAttMessages(true);
    }

    if (this.eventListener === 'mouseleave') {
      this.mainUsersThis.toggleAttMessages(false);
    }

    if (this.eventListener === 'mousemove' && target.closest('.interaction__messages')) {
      this.mainUsersThis.overBlockActionMessage(event.clientX, event.clientY);
    }
  }
}
