import ManipulationMainUsers from '../../view/util/manipulationMainUsers';
import { IUnit } from '../../interfaces/interfaces';

export default class Unit implements IUnit {
  private mainUsers = new ManipulationMainUsers();

  public checkUsers(): void {
    const search = this.mainUsers.getSearchUser();
    const users = this.mainUsers.getUsers();
    const needUsers = users.filter((el) => el?.includes(search));

    this.mainUsers.showUsers(needUsers);
  }
}
