export interface IError {
  ok: boolean;
  status: number;
  statusText: string;
  json(): void;
}