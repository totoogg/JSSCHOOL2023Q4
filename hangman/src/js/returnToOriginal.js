import { randomQuestion } from "./randomQuestion.js";

export const returnToOriginal = () => {
  document.querySelector('.modal__button').addEventListener('click', () => {
    let countQuestion = randomQuestion();
    document.querySelector('.question__current').textContent =
      countQuestion.question;

    let countAnswer = document.querySelector('.crossword__answer');
    countAnswer.innerHTML = '';

    for (let i = 0; i < countQuestion.answer.length; i++) {
      let div = document.createElement('div');
      div.classList.add('answer__letter');
      div.textContent = '_';
      countAnswer.append(div);
    }

    console.log(countQuestion.answer);

    document
      .querySelectorAll('.keyboard__letter')
      .forEach((x) => x.classList.remove('pressing'));

    document.querySelectorAll('.hangman > *').forEach((x, i) => {
      if (i !== 0) {
        x.classList.add('display-none');
      }
    });

    document.querySelector('.backdrop').classList.add('display-none');
    document.querySelector('.modal').classList.add('display-none');
    document.querySelector('html').classList.remove('block');
    document.querySelector('body').classList.remove('block');

    document.querySelector('.miss__current').textContent = `0 / 6`;
  });
};