import { buildGame } from "./buildGame.js";

export const createButtonsSave = () => {
  const block = document.querySelector('.content__button');
  let div = document.createElement('div');
  div.classList.add('button__save-content');
  block.append(div);

  let save = document.createElement('button');
  save.classList.add('save-content__button-save');
  save.classList.add('button');
  save.textContent = 'Save the game';
  div.append(save);

  save.addEventListener('click', () => {
    document
      .querySelector('.save-content__button-loading')
      .classList.remove('disabled');
    let clickBlocks = document.querySelectorAll('.row__data[data-click]');
    let saveArr = Array.from(clickBlocks).map((x) => {
      if (x.classList.contains('brill')) {
        return 1;
      } else if (x.classList.contains('active')) {
        return 2;
      } else {
        return 0;
      }
    });

    const objSave = {
      index: localStorage.getItem('totooggNonogramsArrIndex'),
      arrClick: saveArr,
      time: document.querySelector('.media__timer').textContent,
    };
    localStorage.setItem(
      'totooggNonogramsArrSaveGame',
      JSON.stringify(objSave),
    );
  });

  let loading = document.createElement('button');
  loading.classList.add('save-content__button-loading');
  loading.classList.add('button');
  if (!localStorage.getItem('totooggNonogramsArrSaveGame')) {
    loading.classList.add('disabled');
  }
  loading.textContent = 'Continue the last game';
  div.append(loading);

  loading.addEventListener('click', () => {
    if (localStorage.getItem('totooggNonogramsArrSaveGame')) {
      localStorage.setItem('totooggNonogramsTimer', false);
      let save = JSON.parse(
        localStorage.getItem('totooggNonogramsArrSaveGame'),
      );
      document.querySelector('.media__timer').textContent = save.time;
      buildGame(+save.index);
      let clicks = document.querySelectorAll('.row__data[data-click]');
      save.arrClick.forEach((x, index) => {
        if (x === 1) {
          clicks[index].classList.add('brill');
        } else if (x === 2) {
          clicks[index].classList.add('active');
        }
      });
    }
  });
};