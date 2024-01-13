import questions from './questions.json' assert { type: 'json' };
import { rangeRandom } from './rangeRandom.js';

export const randomQuestion = () => {
  let countQuestion = questions[rangeRandom(1, questions.length) - 1];
  let currentRandom = localStorage.getItem('currentRandomHangman');
  if (currentRandom === null) {
    localStorage.setItem('currentRandomHangman', countQuestion.id);
  } else {
    if (+currentRandom === countQuestion.id) {
      if (countQuestion.id !== 10) {
        countQuestion = questions[countQuestion.id];
      } else {
        countQuestion = questions[0];
      }
    }
    localStorage.setItem('currentRandomHangman', countQuestion.id);
  }
  return countQuestion;
};
