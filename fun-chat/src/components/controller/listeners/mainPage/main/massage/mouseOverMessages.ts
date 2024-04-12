import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';

export default class MouseOverMessages extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    if (this.eventListener === 'mouseenter') {
      this.mainUsersThis.toggleAttMessages(true);
    }

    if (this.eventListener === 'mouseleave') {
      this.mainUsersThis.toggleAttMessages(false);
    }
  }
}
