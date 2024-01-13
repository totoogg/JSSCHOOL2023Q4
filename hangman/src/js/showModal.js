import questions from './questions.json' assert { type: 'json' };

export const showModal = (str) => {
  let question = document.querySelector('.question__current').textContent;
  let answer = questions.find((x) => question === x.question);
  let modal = document.querySelector('.modal');
  document.querySelector('.backdrop').classList.remove('display-none');
  modal.classList.remove('display-none');
  modal.querySelector('.modal__answer').textContent =
    `Answer: ${answer.answer.toUpperCase()}`;
  document.querySelector('html').classList.add('block');
  document.querySelector('body').classList.add('block');
  if (str === 'loss') {
    modal.querySelector('.modal__title').textContent = 'FAIL';
  } else {
    modal.querySelector('.modal__title').textContent = 'WIN';
  }
};