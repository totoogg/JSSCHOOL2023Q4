import Router from '../../router/router';
import Listener from '../listener';
import { IAction } from '../../../interfaces/interfaces';

export default class ButtonInfo extends Listener implements IAction {
  public eventListener: string;

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
