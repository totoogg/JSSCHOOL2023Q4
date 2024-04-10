import ManipulationMainUsers from '../../../../view/util/manipulationMainUsers';
import { IEventUnit } from '../../../../interfaces/interfaces';
import Listener from '../../listener';

export default class ButtonLogout extends Listener {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();

    const userLocation = sessionStorage.getItem('totoogg-JSFE2023Q4');

    if (userLocation) {
      const userData = JSON.parse(userLocation);
      const user: IEventUnit = {
        id: userData.id,
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: userData.login,
            password: userData.password,
          },
        },
      };

      this.sendServerData(user);
      this.mainUsersThis.clearUsers();
    }
  }
}
