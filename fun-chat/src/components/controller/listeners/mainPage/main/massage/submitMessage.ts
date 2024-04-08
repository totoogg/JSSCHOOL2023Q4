import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Work from '../../../workWithServer';

export default class SubmitMessage extends Work {
  public eventListener: string;

  private mainUsersThis = new ManipulationMainUsers();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(event: Event): void {
    event.preventDefault();
    console.log(3);
  }
}
