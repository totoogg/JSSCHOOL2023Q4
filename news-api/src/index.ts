import App from './components/app/app';
import './global.css';

interface IDataSources {
    name: string;
    id: string;
}
interface ISources {
    draw(data: IDataSources[]): void;
}
interface ISourcesNews {
    id: string;
    name: string;
}

interface IDataNews {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source: ISourcesNews;
}
interface INews {
    draw(data: IDataNews[]): void;
}
interface IDrawNewsData {
    articles: IDataNews[];
}
interface IDrawSourcesData {
    sources: IDataSources[];
}
interface IAppView {
    news: INews;
    sources: ISources;
    drawNews(data: IDrawNewsData): void;
    drawSources(data: IDrawSourcesData): void;
}
interface IController {
    getSources(callback: (data?: IDrawSourcesData) => void): void;
    getNews(e: Event, callback: (data?: IDrawNewsData) => void): void;
}
interface IApp {
    controller: IController;
    view: IAppView;
    start(): void;
}

const app: IApp = new App();
app.start();
