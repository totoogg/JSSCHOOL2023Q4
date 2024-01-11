import { pressingLetter } from './pressingLetter.js';

export const alphabetClickMouse = () => {
  document
    .querySelector('.crossword__keyboard')
    .addEventListener('click', (event) => {
      let letter = event.target.closest('.keyboard__letter');
      if (!letter) return;
      if (letter.matches('.pressing')) return;
      pressingLetter(letter.textContent);
    });
};
