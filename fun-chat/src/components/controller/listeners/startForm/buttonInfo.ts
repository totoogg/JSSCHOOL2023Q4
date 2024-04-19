import ManipulationFormStart from '../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../view/util/manipulationMainUsers';
import Router from '../../router/router';
import Listener from '../listener';

export default class ButtonInfo extends Listener {
  public eventListener: string;

  private formStartThis = new ManipulationFormStart();

  private mainUsersThis = new ManipulationMainUsers();

  private routerThis = new Router();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    this.routerThis.navigate('totoogg-JSFE2023Q4/fun-chat/prod/about');
  }
}
