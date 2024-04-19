import { IAction } from '../../interfaces/interfaces';
import WorkWithServer from './workWithServer';

export default abstract class Listener extends WorkWithServer implements IAction {
  abstract eventListener: string;

  abstract callback(event?: Event): void;
}
