import News from './news/news';
import Sources from './sources/sources';
import { IData } from '../interfaces/IData';
import { ISources } from '../interfaces/ISources';
import { IDataNews } from '../interfaces/IDataNews';
import { IDrawNewsData } from '../interfaces/IDrawNewsData';
import { IDrawSourcesData } from '../interfaces/IDrawSourcesData';
import { IAppView } from '../interfaces/IAppView';

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
