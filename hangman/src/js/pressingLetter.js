import questions from './questions.json' assert { type: 'json' };
import { updateAnswer } from './updateAnswer.js';
import { updateMiss } from './updateMiss.js';

export const pressingLetter = (letter) => {
  let letters = document.querySelectorAll('.keyboard__letter');
  let key = Array.from(letters).find((x) => x.textContent === letter);
  let current = localStorage.getItem('currentRandomHangman');
  let currentAnswer = questions[+current - 1].answer;
  key.classList.add('pressing');
  let arrAnswer = currentAnswer.toUpperCase().split('');

  if (arrAnswer.includes(letter)) {
    updateAnswer(letter, arrAnswer);
  } else {
    updateMiss();
  }
};
