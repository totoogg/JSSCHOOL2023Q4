import { Types } from './interfaces';

export interface IEventUnit {
  id: string | null;
  type: Types;
  payload: {
    user?: { login: string; password?: string; isLogined?: boolean };
    users?: { login: string; isLogined?: boolean }[];
    error?: string;
  } | null;
}
