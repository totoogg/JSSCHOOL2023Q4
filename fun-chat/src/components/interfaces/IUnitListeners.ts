import { IEventUnit, Types } from './interfaces';

export interface IUnitListeners {
  on(type: Types, listener: (arg: IEventUnit) => void): void;
  emit(type: Types, arg: IEventUnit): void;
}
