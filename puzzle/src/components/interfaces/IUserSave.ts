import { ISaveData } from './interfaces';

export interface IUserSave {
  name: string;
  surname: string;
  login: boolean;
  textHelp?: boolean;
  soundHelp?: boolean;
  imageHelp?: boolean;
  level?: boolean[][];
  saveData?: ISaveData;
}
