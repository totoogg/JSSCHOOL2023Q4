import { IEventUnit, IEvents, Types } from '../../interfaces/interfaces';

export default class UnitListeners {
  public events: IEvents = {}; // todo private

  on(type: Types, listener: (arg: IEventUnit) => void): void {
    this.events[type] = (this.events[type] || []) as ((arg: IEventUnit) => void)[] | [];
    if (this.events[type]) {
      this.events[type]!.push(listener);
    }
  }

  emit(type: Types, arg: IEventUnit) {
    if (this.events[type]) {
      this.events[type]!.forEach((el) => el(arg));
    }
  }
}
