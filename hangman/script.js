import { randomQuestion } from './src/js/randomQuestion.js';
import { loadPage } from './src/js/loadPage.js';
import { createModal } from './src/js/createModal.js';
import { alphabetClickMouse } from './src/js/alphabetClickMouse.js';
import { clickKeyboard } from './src/js/clickKeyboard.js';
import { returnToOriginal } from './src/js/returnToOriginal.js';

window.onload = function () {
  let countQuestion = randomQuestion();

  let alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  console.log(countQuestion.answer);

  loadPage(countQuestion, alphabet);
  createModal(countQuestion.answer);
  alphabetClickMouse();
  clickKeyboard();
  returnToOriginal();
};