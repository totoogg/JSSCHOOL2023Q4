import schemes from './schemes.json' assert { type: 'json' };
import { buildGame } from "./buildGame.js";

export const createModalStart = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-start');
  body.append(div);

  let title = document.createElement('h2');
  title.classList.add('modal-start__title');
  title.textContent = 'Choose the difficulty';
  div.append(title);

  let choose = document.createElement('div');
  choose.classList.add('modal-start__choose');
  div.append(choose);

  let arrSize = Array.from(new Set(schemes.map((x) => x.size)));

  for (let i = 0; i < arrSize.length; i++) {
    let button = document.createElement('button');
    button.classList.add('choose__button');
    button.classList.add('button');
    button.setAttribute('data-choose', `${i}`);
    if (i === 0) {
      button.textContent = `Easy(${arrSize[i]}x${arrSize[i]})`;
    }
    if (i === 1) {
      button.textContent = `Middle(${arrSize[i]}x${arrSize[i]})`;
    }
    if (i === 2) {
      button.textContent = `Hard(${arrSize[i]}x${arrSize[i]})`;
    }

    choose.append(button);

    button.addEventListener('click', () => {
      let modalStart = document.querySelector('.modal-start');
      modalStart.classList.add('display-none');

      let modalList = document.querySelector('.modal-choose-list');
      modalList.classList.remove('display-none');

      let index = arrSize[i];
      let choose = document.querySelector('.modal-choose-list');
      choose.innerHTML = '';

      let title = document.createElement('h2');
      title.classList.add('modal-choose-list__tittle');
      title.textContent = 'Select scheme';
      choose.append(title);
      let arr = schemes.filter((x) => x.size === index).map((x) => x.name);
      for (let i = 0; i < arr.length + 1; i++) {
        let button = document.createElement('button');
        button.classList.add('modal-choose-list__item');
        button.classList.add('button');
        if (i !== arr.length) {
          button.textContent = `${arr[i]}`;
          button.addEventListener('click', () => {
            localStorage.setItem('totooggNonogramsTimer', false);
            document.querySelector('.media__timer').textContent = '00:00:00';
            let arrName = schemes.map((x) => x.name);
            let index = arrName.indexOf(arr[i]);
            buildGame(index);
            localStorage.setItem('totooggNonogramsArrIndex', index);

            let modalList = document.querySelector('.modal-choose-list');
            modalList.classList.add('display-none');
            let backdrop = document.querySelector('.backdrop');
            backdrop.classList.add('display-none');
          });
        } else {
          button.textContent = `Back`;
          button.addEventListener('click', () => {
            document
              .querySelector('.modal-choose-list')
              .classList.add('display-none');
            document
              .querySelector('.modal-start')
              .classList.remove('display-none');
          });
        }
        choose.append(button);
      }
    });
  }
};