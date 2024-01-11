export const createModal = (answer) => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal');
  div.classList.add('display-none');
  body.append(div);

  let backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  backdrop.classList.add('display-none');
  body.append(backdrop);

  let title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'WIN';
  div.append(title);

  let currentAnswer = document.createElement('p');
  currentAnswer.classList.add('modal__answer');
  currentAnswer.textContent = `Answer: ${answer.toUpperCase()}`;
  div.append(currentAnswer);

  let button = document.createElement('button');
  button.classList.add('modal__button');
  button.textContent = 'play again';
  div.append(button);
};
