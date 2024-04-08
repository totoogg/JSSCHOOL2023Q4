import UnitListeners from '../controller/listeners/unitListeners';
import { Types } from '../interfaces/interfaces';

export default class WebSocketConnect extends UnitListeners {
  private socket = new WebSocket('ws://127.0.0.1:4000');

  constructor() {
    super();
    this.socket.addEventListener('message', this.serverMessage.bind(this));
  }

  public connectServer(data: string): void {
    this.socket.send(data);
  }

  private serverMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);
    const type = data.type as Types;
    /*     console.log(type);
    console.log(this.events); */

    this.emit(type, data);
  }
}
