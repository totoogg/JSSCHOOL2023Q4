export interface IManipulationMainUsers {
  activeButtonSendMessage(bool: boolean): void;
  clearUsers(): void;
  clearCountMessage(): void;
  clearInputMessage(): void;
  getSearchUser(): string;
  getUsers(): (string | null)[];
  showUsers(arr: (string | null)[]): void;
  checkUser(login: string): boolean;
  checkMessage(): boolean;
  updateStatusUser(login: string): void;
  sortUsers(): void;
  changeUserStatusOffline(user: string): void;
  updateStatus(bool: boolean): void;
  updateUserMessage(user: string, bool: boolean): void;
  selectUser(status: boolean, name: string, nameFull: string | null): void;
  getMessageValue(): string;
  buttonSend(but: boolean): void;
  checkButtonSend(): boolean;
  getUserToSend(): string;
  getUserFromSend(): string;
  checkCountMessages(): void;
  checkIdMessages(id: string): boolean;
  updateCountMessages(name: string, countMessage?: number): void;
  addDividingStrip(): void;
  checkDividingStrip(): boolean;
  clearStrip(): void;
  toggleAttMessages(bool: boolean): void;
  checkAttMessages(): string;
  updateMessageScrolling(): void;
  addMessage(
    name: string,
    text: string,
    time: string,
    id: string,
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    },
  ): void;
  clearFieldMessages(): void;
  clearFieldMessagesLogout(): void;
  clearInteractionMessages(): void;
  updateSentMessage(id: string, delivered: boolean): void;
  updateReadedMessage(id: string, readed: boolean): void;
  getIdMessagesDelivered(): (string | null)[];
  overBlockActionMessage(x: number, y: number): void;
  showActionMessage(bool: boolean): void;
  writeIdActionMessage(id: string): void;
  getIdActionMessage(): string | null;
  selectMessage(id: string): void;
  messageDelete(id: string): void;
  addTextInInput(id: string): void;
  clearMessageEdit(): void;
  showCancelEdit(bool: boolean): void;
  getIdInput(): string | null;
  checkEdit(): boolean;
  messageEdit(id: string, text: string): void;
  selectUserClick(name: string): void;
}
