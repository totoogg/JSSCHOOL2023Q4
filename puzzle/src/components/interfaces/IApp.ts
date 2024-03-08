import { IUserSave } from './interfaces';

export interface IApp {
  createPage(): void;
  checkUsers(): boolean;
  settingName(): void;
  localData(): IUserSave[] | [];
}
