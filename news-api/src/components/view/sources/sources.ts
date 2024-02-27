import './sources.css';

interface IData {
    name: string;
    id: string;
}

interface ISources {
    draw(data: IData[]): void;
}

class Sources implements ISources {
  
    draw(data: IData[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');

        data.forEach((item: IData) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
    
}

export default Sources;
