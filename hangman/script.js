import questions from './src/js/questions.json' assert { type: 'json' };

window.onload = function () {
  let countQuestion = question();

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
  returnToOriginal();
};

const rangeRandom = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const question = () => {
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

const returnToOriginal = () => {
  document.querySelector('.modal__button').addEventListener('click', () => {
    let countQuestion = question();
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

const loadPage = (countQuestion, alphabet) => {
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
    if (i !== 0) {
      div.classList.add('display-none');
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
    div.classList.add('answer__letter');
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

  for (let i = 0; i < alphabet.length; i++) {
    let div = document.createElement('div');
    div.classList.add('keyboard__letter');
    div.textContent = `${alphabet[i]}`;
    document.querySelector('.crossword__keyboard').append(div);
  }
};

const createModal = (answer) => {
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

const showModal = (str) => {
  let modal = document.querySelector('.modal');
  document.querySelector('.backdrop').classList.remove('display-none');
  modal.classList.remove('display-none');
  document.querySelector('html').classList.add('block');
  document.querySelector('body').classList.add('block');
  if (str === 'loss') {
    modal.querySelector('.modal__title').textContent = 'FAIL';
  } else {
    modal.querySelector('.modal__title').textContent = 'WIN';
  }
};

const updateMiss = () => {
  let miss = document.querySelector('.miss__current').textContent[0];
  if (+miss === 5) {
    showModal('loss');
  }
  document.querySelector('.miss__current').textContent = `${+miss + 1} / 6`;
  let hangman = document.querySelector('.hangman');
  hangman.querySelectorAll('.display-none')[0].classList.remove('display-none');
};

const updateAnswer = (letter, arrAnswer) => {
  let answer = document.querySelectorAll('.answer__letter');
  arrAnswer.forEach((x, i) => {
    if (x === letter) {
      answer[i].textContent = letter;
    }
  });
  let arr = Array.from(answer)
    .map((x) => x.textContent)
    .filter((x) => x === '_');
  if (arr.length === 0) {
    showModal('win');
  }
};

const pressingLetter = (letter) => {
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

const alphabetClickMouse = () => {
  document
    .querySelector('.crossword__keyboard')
    .addEventListener('click', (event) => {
      let letter = event.target.closest('.keyboard__letter');
      if (!letter) return;
      if (letter.matches('.pressing')) return;
      pressingLetter(letter.textContent);
    });
};
