import { IDrawSourcesData } from './IDrawSourcesData';
import { IDrawNewsData } from './IDrawNewsData';

export interface IController {
    getSources(callback: (data?: IDrawSourcesData) => void): void;
    getNews(e: Event, callback: (data?: IDrawNewsData) => void): void;
}
