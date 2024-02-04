import { buildGame } from "./buildGame.js";

export const createModal = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-finish');
  div.classList.add('display-none');
  body.append(div);

  let title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = `Great! You have solved the nonogram in ${0} seconds!`;
  div.append(title);

  let button = document.createElement('button');
  button.classList.add('finish__button');
  button.classList.add('button');
  button.textContent = 'Play again';
  div.append(button);

  button.addEventListener('click', () => {
    div.classList.add('display-none');

    buildGame(0);

    localStorage.removeItem('totooggNonogramsArrIndex');

    document.querySelector('.modal-start').classList.remove('display-none');

    document.querySelector('.media__timer').textContent = '00:00:00';
  });
};