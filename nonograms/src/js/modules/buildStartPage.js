import { upTimer } from './upTimer.js';
import { buildGame } from './buildGame.js';
import { createModalChooseList } from './createModalChooseList.js';
import { createModalStart } from './createModalStart.js';
import { createButtonReset } from './createButtonReset.js';
import { createButtonSolution } from './createButtonSolution.js';
import { createButtonsSave } from './createButtonsSave.js';
import { createButtonChoseLevel } from './createButtonChoseLevel.js';
import { createButtonsRandomGame } from './createButtonsRandomGame.js';
import { createTimer } from './createTimer.js';
import { createButtonThemes } from './createButtonThemes.js';
import { createButtonSound } from './createButtonSound.js';
import { createButtonRecord } from './createButtonRecord.js';

export const buildStartPage = () => {
  localStorage.setItem('totooggNonogramsTimer', false);
  localStorage.setItem('totooggNonogramsMusic', true);

  const body = document.querySelector('body');

  const title = document.createElement('h1');
  title.classList.add('headline');
  title.textContent = 'Nonogram';
  body.append(title);

  const contentTimer = document.createElement('div');
  contentTimer.classList.add('media');
  body.append(contentTimer);

  let backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  body.append(backdrop);

  backdrop.addEventListener('click', () => {
    if (
      localStorage.getItem('totooggNonogramsArrIndex') &&
      document.querySelector('.modal-finish').classList.contains('display-none')
    ) {
      backdrop.classList.add('display-none');
      document.querySelector('.modal-start').classList.add('display-none');
      document.querySelector('.modal-record').classList.add('display-none');
      document
        .querySelector('.modal-choose-list')
        .classList.add('display-none');
    }
  });

  createModalStart();
  createModalChooseList();

  const content = document.createElement('div');
  content.classList.add('content');
  body.append(content);

  const game = document.createElement('table');
  game.classList.add('content__game');
  content.append(game);

  const button = document.createElement('div');
  button.classList.add('content__button');
  content.append(button);

  localStorage.removeItem('totooggNonogramsArrIndex');

  buildGame(0);

  createButtonChoseLevel();
  createButtonReset();
  createButtonSolution();
  createButtonsSave();
  createButtonsRandomGame();
  createTimer();
  createButtonSound();
  createButtonThemes();
  createButtonRecord();

  setInterval(upTimer, 1000);
};
