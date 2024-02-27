import News from './news/news';
import Sources from './sources/sources';

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

export class AppView implements IAppView {

    public news: INews = new News();

    public sources: ISources = new Sources();

    drawNews(data: IDrawNewsData) {
        const values: IDataNews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDrawSourcesData) {
        const values: IDataSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

}

export default AppView;
