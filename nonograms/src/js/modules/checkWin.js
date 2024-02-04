import { showModal } from "./showModal.js";
import { writeRecord } from "./writeRecord.js"

export const checkWin = () => {
  const game = document.querySelector('.content__game');

  const brillSquare = game.querySelectorAll('.brill').length;
  const brillSquareTrue = game.querySelectorAll('.brill[data-true]').length;

  if (brillSquare === brillSquareTrue) {
    let finishSquare = game.querySelectorAll('.row__data[data-true]').length;

    if (brillSquare === finishSquare && brillSquareTrue === finishSquare) {
      if (localStorage.getItem('totooggNonogramsMusic') === 'true') {
        musicPlay('src/sounds/win.mp3');
      }

      localStorage.setItem('totooggNonogramsTimer', false);
      showModal();
      writeRecord();
    }
  }
};