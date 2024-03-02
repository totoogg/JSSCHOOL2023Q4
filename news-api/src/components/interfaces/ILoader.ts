import { IOption } from './IOption';
import { IError } from './IError';

export interface ILoader {
    getResp(first: { endpoint: string; options: object }, callback: (data?: void) => string): void;
    errorHandler(res: IError): IError;
    makeUrl(options: IOption, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data?: void) => void, options: IOption): void;
}
