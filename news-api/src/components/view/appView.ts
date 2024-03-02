import News from './news/news';
import Sources from './sources/sources';
import { IData, ISources, IDataNews, IDrawNewsData, IDrawSourcesData, IAppView } from '../interfaces/AllInterfaces';

export class AppView implements IAppView {
    private news: ISources<IDataNews> = new News();

    private sources: ISources<IData> = new Sources();

    public drawNews(data: IDrawNewsData): void {
        const values: IDataNews[] = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: IDrawSourcesData): void {
        const values: IData[] = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
