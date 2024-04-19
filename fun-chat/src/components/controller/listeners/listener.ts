import WorkWithServer from './workWithServer';
import { IAction } from '../../interfaces/interfaces';

export default abstract class Listener extends WorkWithServer implements IAction {
  abstract eventListener: string;

  abstract callback(event?: Event): void;
}
