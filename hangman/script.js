import questions from './src/js/questions.json' assert { type: 'json' };

window.onload = function () {
  console.log(questions);

  loadPage();
};

const loadPage = () => {
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
};


