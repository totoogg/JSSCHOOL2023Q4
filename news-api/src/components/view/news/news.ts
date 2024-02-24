import './news.css';

interface ISources {
    id: string;
    name: string;
}

interface IData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source: ISources;
}
interface INews {
    draw(data: IData[]): void;
}
class News implements INews {
    draw(data: IData[]) {
        const news: IData[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })` as string;
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
