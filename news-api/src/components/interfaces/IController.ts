import { IDrawNewsData, IDrawSourcesData } from './AllInterfaces';

export interface IController {
    getSources(callback: (data?: IDrawSourcesData) => void): void;
    getNews(e: Event, callback: (data?: IDrawNewsData) => void): void;
}
