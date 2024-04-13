export interface IAction {
  eventListener: string;
  callback(event: Event | MouseEvent): void;
}
