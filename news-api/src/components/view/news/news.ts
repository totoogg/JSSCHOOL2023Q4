import './news.css';
import { IDataNews } from '../../interfaces/IDataNews';
import { ISources } from '../../interfaces/ISources';

class News implements ISources<IDataNews> {

    public draw(data: IDataNews[]): void {
        const news: IDataNews[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage =
                `url(${item.urlToImage})` as string;
            newsClone.querySelector('.news__meta-author').textContent = (item.author || item.source.name) as string;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-') as string;

            newsClone.querySelector('.news__description-title').textContent = item.title as string;
            newsClone.querySelector('.news__description-source').textContent = item.source.name as string;
            newsClone.querySelector('.news__description-content').textContent = item.description as string;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '' as string;
        document.querySelector('.news').appendChild(fragment);
    }

}

export default News;
