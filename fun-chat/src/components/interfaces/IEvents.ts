import { IEventUnit } from './interfaces';

export interface IEvents {
  USER_LOGIN?: ((arg: IEventUnit) => void)[];
  ERROR?: ((arg: IEventUnit) => void)[];
  USER_LOGOUT?: ((arg: IEventUnit) => void)[];
  USER_EXTERNAL_LOGIN?: ((arg: IEventUnit) => void)[];
  USER_EXTERNAL_LOGOUT?: ((arg: IEventUnit) => void)[];
  USER_ACTIVE?: ((arg: IEventUnit) => void)[];
  USER_INACTIVE?: ((arg: IEventUnit) => void)[];
  MSG_SEND?: ((arg: IEventUnit) => void)[];
  MSG_FROM_USER?: ((arg: IEventUnit) => void)[];
  MSG_DELIVER?: ((arg: IEventUnit) => void)[];
  MSG_READ?: ((arg: IEventUnit) => void)[];
  MSG_DELETE?: ((arg: IEventUnit) => void)[];
  MSG_EDIT?: ((arg: IEventUnit) => void)[];
}
