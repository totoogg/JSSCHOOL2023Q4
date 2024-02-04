import { musicPlay } from "./musicPlay.js";
import { checkWin } from "./checkWin.js";

export const clickSquare = () => {
  document
    .querySelector('.content__game')
    .addEventListener('mousedown', (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      let td = event.target.closest('.row__data');

      if (!td || !td.getAttribute('data-click')) return;

      if (event.button === 2) {
        if (localStorage.getItem('totooggNonogramsMusic') === 'true') {
          musicPlay('src/sounds/clickRight.mp3');
        }
        td.classList.remove('brill');
        td.classList.toggle('active');
        return;
      } else {
        if (localStorage.getItem('totooggNonogramsMusic') === 'true') {
          musicPlay('src/sounds/clickLeft.mp3');
        }
        td.classList.remove('active');
        td.classList.toggle('brill');
      }

      if (
        document.querySelector('.media__themes').classList.contains('night')
      ) {
        td.classList.add('night');
      }

      if (localStorage.getItem('totooggNonogramsTimer') === 'false') {
        localStorage.setItem('totooggNonogramsTimer', true);
      }

      checkWin();
    });

  document.querySelector('.content__game').oncontextmenu = function (event) {
    if (event.defaultPrevented) return;
    event.preventDefault();
  };
};