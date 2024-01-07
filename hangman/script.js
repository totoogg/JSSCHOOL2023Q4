import questions from './src/js/questions.json' assert { type: 'json' };

window.onload = function () {
  let countQuestion = questions[rangeRandom(1, questions.length) - 1];
  console.log(countQuestion.answer);
  loadPage(countQuestion);
};

const loadPage = (countQuestion) => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  let title = document.createElement('h1');

  div.classList.add('content');
  title.classList.add('title');
  title.textContent = 'HANGMAN GAME';

  body.prepend(div);
  body.prepend(title);

  for (let i = 0; i < 2; i++) {
    let div = document.createElement('div');
    if (i === 0) {
      div.classList.add('hangman');
    } else {
      div.classList.add('crossword');
    }
    document.querySelector('.content').append(div);
  }

  for (let i = 0; i < 7; i++) {
    let div = document.createElement('div');
    if (i === 0) {
      div.classList.add('hangman__gallows');
    } else if (i === 1) {
      div.classList.add('hangman__head');
    } else if (i === 2) {
      div.classList.add('hangman__body');
    } else if (i === 3) {
      div.classList.add('hangman__hand-one');
    } else if (i === 4) {
      div.classList.add('hangman__hand-two');
    } else if (i === 5) {
      div.classList.add('hangman__leg-one');
    } else {
      div.classList.add('hangman__leg-two');
    }
    document.querySelector('.hangman').append(div);
  }

  for (let i = 0; i < 4; i++) {
    let div = document.createElement('div');
    if (i === 0) {
      div.classList.add('crossword__answer');
    } else if (i === 1) {
      div.classList.add('crossword__question');
    } else if (i === 2) {
      div.classList.add('crossword__miss');
    } else {
      div.classList.add('crossword__keyboard');
    }
    document.querySelector('.crossword').append(div);
  }

  for (let i = 0; i < countQuestion.answer.length; i++) {
    let div = document.createElement('div');
    div.textContent = '_';
    document.querySelector('.crossword__answer').append(div);
  }

  document.querySelector('.crossword__question').textContent = `Hint: `;
  let spanQuestion = document.createElement('span');
  spanQuestion.classList.add('question__current');
  spanQuestion.textContent = `${countQuestion.question}`;
  document.querySelector('.crossword__question').append(spanQuestion);

  document.querySelector('.crossword__miss').textContent =
    `Incorrect guesses: `;
  let spanMiss = document.createElement('span');
  spanMiss.classList.add('miss__current');
  spanMiss.textContent = `0 / 6`;
  document.querySelector('.crossword__miss').append(spanMiss);

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

  for (let i = 0; i < alphabet.length; i++) {
    let div = document.createElement('div');
    div.classList.add('keyboard__letter')
    div.textContent = `${alphabet[i]}`
    document.querySelector('.crossword__keyboard').append(div);
  }
};

const rangeRandom = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
