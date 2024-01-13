import { pressingLetter } from './pressingLetter.js';

export const clickKeyboard = () => {
  document.addEventListener('keydown', (event) => {
    let button = event.key.toUpperCase();
    let alphabetButton = Array.from(
      document.querySelectorAll('.keyboard__letter:not(.pressing)'),
    ).map((x) => x.textContent);
    if (alphabetButton.includes(button)) {
      pressingLetter(button);
    }
  });
};
