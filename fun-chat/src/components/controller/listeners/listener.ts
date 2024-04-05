import { IAction } from '../../interfaces/interfaces';

export default abstract class Listener implements IAction {
  abstract eventListener: string;

  abstract callback(event?: Event): void;
}
