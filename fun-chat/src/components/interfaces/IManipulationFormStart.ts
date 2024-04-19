export interface IManipulationFormStart {
  getNameValue(): string;
  setNameValue(str: string): void;
  visibilityNameError(bool: boolean): void;
  getPasswordValue(): string;
  setPasswordValue(str: string): void;
  checkButton(): boolean;
  visibilityPasswordError(bool: boolean): void;
  checkVisibilityError(): boolean;
  buttonLogin(but?: string): void;
  hiddenFormStart(): void;
  showError(text: string): void;
  showErrorConnect(bool: boolean): void;
  hiddenError(): void;
  showInfo(): void;
  setAttMain(): void;
  hiddenInfo(): void;
  showMain(): void;
  startPage(): void;
  addUser(info: { status: boolean; name: string; count: number }): void;
  submitForm(): void;
  clickLogout(): void;
  clickInfo(): void;
  checkInfo(): boolean;
  showNotFound(): void;
}
