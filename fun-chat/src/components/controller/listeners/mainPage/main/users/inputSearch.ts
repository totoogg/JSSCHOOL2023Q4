import WebSocketConnect from '../../../../../model/webSocketConnect';
import ManipulationFormStart from '../../../../../view/util/manipulationFormStart';
import ManipulationMainUsers from '../../../../../view/util/manipulationMainUsers';
import Listener from '../../../listener';
import Unit from '../../../unit';

export default class InputSearch extends Listener {
  public eventListener: string;

  private mainUsers = new ManipulationMainUsers();

  private formStart = new ManipulationFormStart();

  private server = new WebSocketConnect();

  private unit = new Unit();

  constructor(key: string) {
    super();
    this.eventListener = key;
  }

  public callback(): void {
    this.unit.checkUsers();
  }
}
