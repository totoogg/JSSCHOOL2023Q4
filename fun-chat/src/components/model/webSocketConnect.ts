import WorkWithServer from '../controller/listeners/workWithServer';
import { Types } from '../interfaces/interfaces';

const socket = new WebSocket('ws://127.0.0.1:4000');

export default class WebSocketConnect {
  public connectServer(data: string): void {
    socket.send(data);
  }
}

socket.addEventListener('message', (event) => {
  const server = new WorkWithServer();
  const data = JSON.parse(event.data);
  const type = data.type as Types;

  server.emit(type, data);
});
