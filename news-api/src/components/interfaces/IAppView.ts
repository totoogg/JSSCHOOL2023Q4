import { IDrawNewsData, IDrawSourcesData } from './AllInterfaces';

export interface IAppView {
    drawNews(data: IDrawNewsData): void;
    drawSources(data: IDrawSourcesData): void;
}
