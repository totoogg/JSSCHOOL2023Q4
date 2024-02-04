import schemes from './schemes.json' assert { type: 'json' };
import { buildGame } from "./buildGame.js";
import { rangeRandom } from "./rangeRandom.js";

export const createButtonsRandomGame = () => {
  const block = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('random');
  button.classList.add('button');
  button.textContent = 'Random game';
  block.append(button);

  button.addEventListener('click', () => {
    localStorage.setItem('totooggNonogramsTimer', false);
    document.querySelector('.media__timer').textContent = '00:00:00';
    let random = rangeRandom(0, schemes.length - 1);
    if (random === localStorage.getItem('totooggNonogramsArrIndex')) {
      if (random === schemes.length - 1) {
        buildGame(0);
        localStorage.setItem('totooggNonogramsArrIndex', 0);
      } else {
        buildGame(random + 1);
        localStorage.setItem('totooggNonogramsArrIndex', random + 1);
      }
    } else {
      buildGame(random);
      localStorage.setItem('totooggNonogramsArrIndex', random);
    }
  });
};