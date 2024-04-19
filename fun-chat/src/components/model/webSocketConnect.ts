import WorkWithServer from '../controller/listeners/workWithServer';
import { IEventUnit, IWebSocketConnect, Types } from '../interfaces/interfaces';

let socket = new WebSocket('ws://127.0.0.1:4000');

function message(event: MessageEvent): void {
  const server = new WorkWithServer();
  const data = JSON.parse(event.data);
  const type = data.type as Types;

  server.emit(type, data);
}

function open(): void {
  const server = new WorkWithServer();
  const data: IEventUnit = { id: null, type: 'OPEN', payload: null };

  server.emit('OPEN', data);
}

function close(): void {
  const server = new WorkWithServer();
  const data: IEventUnit = { id: null, type: 'CLOSE', payload: null };

  server.emit('CLOSE', data);
  socket = new WebSocket('ws://127.0.0.1:4000');
  socket.onopen = open;
  socket.onmessage = message;
  socket.onclose = close;
}

export default class WebSocketConnect implements IWebSocketConnect {
  public connectServer(data: string): void {
    if (socket.readyState === 1) {
      socket.send(data);
    }
  }
}

socket.addEventListener('message', (event) => {
  message(event);
});

socket.addEventListener('open', () => {
  open();
});

socket.addEventListener('close', () => {
  close();
});
