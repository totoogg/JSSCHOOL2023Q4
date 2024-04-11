import { Types } from './interfaces';

export interface IEventUnit {
  id: string | null;
  type: Types;
  payload: {
    user?: { login: string; password?: string; isLogined?: boolean };
    users?: { login: string; isLogined?: boolean }[];
    error?: string;
    message?: {
      id?: string;
      from?: string;
      to: string;
      text: string;
      datetime?: number;
      status?: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
    messages?: {
      id?: string;
      from?: string;
      to: string;
      text: string;
      datetime?: number;
      status?: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    }[];
  } | null;
}
