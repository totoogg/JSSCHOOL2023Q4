import schemes from './modules/schemes.json' assert { type: 'json' };

window.onload = function () {
  console.log(schemes);
  buildStartPage();
  clickSquare();
  createModal();
};

const showModal = () => {
  let backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('display-none');

  let modalFinish = document.querySelector('.modal-finish');
  modalFinish.classList.remove('display-none');
};

const createModal = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-finish');
  div.classList.add('display-none');
  body.append(div);

  let title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Great! You have solved the nonogram!';
  div.append(title);
};

const checkWin = () => {
  const game = document.querySelector('.content__game');

  const brillSquare = game.querySelectorAll('.brill').length;
  const brillSquareTrue = game.querySelectorAll('.brill[data-true]').length;

  if (brillSquare === brillSquareTrue) {
    let finishSquare = game.querySelectorAll('.row__data[data-true]').length;

    if (brillSquare === finishSquare && brillSquareTrue === finishSquare) {
      showModal();
    }
  }
};

const clickSquare = () => {
  document
    .querySelector('.content__game')
    .addEventListener('mousedown', (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      let td = event.target.closest('.row__data');

      if (!td || !td.getAttribute('data-click')) return;

      if (event.button === 2) {
        td.classList.remove('brill');
        td.classList.toggle('active');
        return;
      } else {
        td.classList.remove('active');
        td.classList.toggle('brill');
      }

      checkWin();
    });

  document.querySelector('.content__game').oncontextmenu = function (event) {
    if (event.defaultPrevented) return;
    event.preventDefault();
  };
};

const buildGame = (number) => {
  const body = document.querySelector('body');

  const playField = schemes[number].scheme;

  const gameTable = document.querySelector('.content__game');
  gameTable.innerHTML = '';

  for (let i = 0; i < schemes[number].size + 1; i++) {
    const row = document.createElement('tr');
    row.classList.add('game__row');
    gameTable.append(row);
  }

  const gameRow = document.querySelectorAll('.game__row');

  for (let i = 0; i < gameRow.length; i++) {
    for (let j = 0; j < gameRow.length; j++) {
      const data = document.createElement('td');
      data.classList.add('row__data');
      gameRow[i].append(data);
    }
  }

  for (let i = 1; i < gameRow.length; i++) {
    let currentRow = gameRow[i];
    let dates = currentRow.querySelectorAll('.row__data');

    let countTop = 0;
    let countLeft = 0;

    let dataZeroLeft = gameRow[i].querySelectorAll('.row__data')[0];
    dataZeroLeft.classList.add('left-key');
    const containerLeftKey = document.createElement('div');
    containerLeftKey.classList.add('left-key__container');
    dataZeroLeft.append(containerLeftKey);

    for (let j = 1; j < dates.length; j++) {
      if (playField[j - 1][i - 1]) {
        countTop++;
      }

      if (
        (j === playField[i - 1].length || !playField[j - 1][i - 1]) &&
        countTop > 0
      ) {
        let dataZero = gameRow[0].querySelectorAll('.row__data')[i];
        dataZero.classList.add('top-key');
        const numberKey = document.createElement('div');
        numberKey.classList.add('key');
        numberKey.textContent = countTop;
        dataZero.append(numberKey);
        countTop = 0;
      }

      if (playField[i - 1][j - 1]) {
        countLeft++;
      }

      if (
        (j === playField[i - 1].length || !playField[i - 1][j - 1]) &&
        countLeft > 0
      ) {
        const numberKey = document.createElement('span');
        numberKey.classList.add('key');
        numberKey.textContent = countLeft;
        containerLeftKey.append(numberKey);
        countLeft = 0;
      }

      if (playField[i - 1][j - 1]) {
        dates[j].setAttribute('data-true', 'true');
      }

      dates[j].setAttribute('data-click', 'true');

      for (let i = 0; i < 2; i++) {
        let span = document.createElement('span');
        dates[j].append(span);
      }
    }
  }
};

const createModalChooseList = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-choose-list');
  div.classList.add('display-none');
  body.append(div);
};

const createModalStart = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-start');
  body.append(div);

  let title = document.createElement('h2');
  title.classList.add('modal-start__title');
  title.textContent = 'Choose the difficulty';
  div.append(title);

  let choose = document.createElement('div');
  choose.classList.add('modal-start__choose');
  div.append(choose);

  let arrSize = Array.from(new Set(schemes.map((x) => x.size)));

  for (let i = 0; i < arrSize.length; i++) {
    let button = document.createElement('button');
    button.classList.add('choose__button');
    button.classList.add('button');
    button.setAttribute('data-choose', `${i}`);
    if (i === 0) {
      button.textContent = `Easy(${arrSize[i]}x${arrSize[i]})`;
    }
    if (i === 1) {
      button.textContent = `Middle(${arrSize[i]}x${arrSize[i]})`;
    }
    if (i === 2) {
      button.textContent = `Hard(${arrSize[i]}x${arrSize[i]})`;
    }

    choose.append(button);

    button.addEventListener('click', () => {
      let modalStart = document.querySelector('.modal-start');
      modalStart.classList.add('display-none');

      let modalList = document.querySelector('.modal-choose-list');
      modalList.classList.remove('display-none');

      let index = arrSize[i];
      let choose = document.querySelector('.modal-choose-list');
      choose.innerHTML = '';

      let title = document.createElement('h2');
      title.classList.add('modal-choose-list__tittle');
      title.textContent = 'Select scheme';
      choose.append(title);
      let arr = schemes.filter((x) => x.size === index).map((x) => x.name);
      for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.classList.add('modal-choose-list__item');
        button.classList.add('button');
        button.textContent = `${arr[i]}`;
        choose.append(button);
        button.addEventListener('click', () => {
          let arrName = schemes.map((x) => x.name);
          let index = arrName.indexOf(arr[i]);
          buildGame(index);
          localStorage.setItem('nonogramsArrIndex', index);

          let modalList = document.querySelector('.modal-choose-list');
          modalList.classList.add('display-none');
          let backdrop = document.querySelector('.backdrop');
          backdrop.classList.add('display-none');
        });
      }
    });
  }
};

const createButtonReset = () => {
  const body = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('reset');
  button.classList.add('button');
  button.textContent = 'Reset game';
  body.append(button);

  button.addEventListener('click', () => {
    let div = document.querySelector('.solution__block');
    if (div) {
      div.remove();
    }
    let arrActive = document.querySelectorAll('.active');
    arrActive.forEach((x) => {
      x.classList.remove('active');
    });
    let arr = document.querySelectorAll('.brill');
    arr.forEach((x) => {
      x.classList.remove('brill');
    });
  });
};

const createButtonSolution = () => {
  const body = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('solution');
  button.classList.add('button');
  button.textContent = 'Solution';
  body.append(button);

  button.addEventListener('click', () => {
    let div = document.createElement('div');
    div.classList.add('solution__block');
    document.querySelector('.content__game').append(div);
    let arr = document.querySelectorAll('.row__data[data-true]');
    arr.forEach((x) => {
      x.classList.add('brill');
    });
  });
};

const createButtonsSave = () => {
  const block = document.querySelector('.content__button');
  let div = document.createElement('div');
  div.classList.add('button__save-content');
  block.append(div);

  let save = document.createElement('button');
  save.classList.add('save-content__button-save');
  save.classList.add('button');
  save.textContent = 'Save the game';
  div.append(save);

  save.addEventListener('click', () => {
    document
      .querySelector('.save-content__button-loading')
      .classList.remove('disabled');
    let clickBlocks = document.querySelectorAll('.row__data[data-click]');
    let saveArr = Array.from(clickBlocks).map((x) => {
      if (x.classList.contains('brill')) {
        return 1;
      } else if (x.classList.contains('active')) {
        return 2;
      } else {
        return 0;
      }
    });
    const objSave = {
      index: localStorage.getItem('nonogramsArrIndex'),
      arrClick: saveArr,
    };
    localStorage.setItem('nonogramsArrSaveGame', JSON.stringify(objSave));
  });

  let loading = document.createElement('button');
  loading.classList.add('save-content__button-loading');
  loading.classList.add('button');
  if (!localStorage.getItem('nonogramsArrSaveGame')) {
    loading.classList.add('disabled');
  }
  loading.textContent = 'Continue the last game';
  div.append(loading);

  loading.addEventListener('click', () => {
    if (localStorage.getItem('nonogramsArrSaveGame')) {
      let save = JSON.parse(localStorage.getItem('nonogramsArrSaveGame'));
      buildGame(+save.index);
      let clicks = document.querySelectorAll('.row__data[data-click]')
      save.arrClick.forEach((x, index) => {
        if (x === 1) {
          clicks[index].classList.add('brill')
        } else if (x === 2) {
          clicks[index].classList.add('active')
        }
      })
    }
  });
};

const createButtonChoseLevel = () => {
  const block = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('choice-level');
  button.classList.add('button');
  button.textContent = 'The choice of level';
  block.append(button);

  button.addEventListener('click', () => {
    let modal = document.querySelector('.modal-start');
    modal.classList.remove('display-none');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('display-none');
  });
};

const rangeRandom = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const createButtonsRandomGame = () => {
  const block = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('random');
  button.classList.add('button');
  button.textContent = 'Random game';
  block.append(button);

  button.addEventListener('click', () => {
    let random = rangeRandom(0, schemes.length - 1);
    if (random === localStorage.getItem('nonogramsArrIndex')) {
      if (random === schemes.length - 1) {
        buildGame(0);
        localStorage.setItem('nonogramsArrIndex', 0);
      } else {
        buildGame(random + 1);
        localStorage.setItem('nonogramsArrIndex', random + 1);
      }
    } else {
      buildGame(random);
      localStorage.setItem('nonogramsArrIndex', random);
    }
  });
};

const buildStartPage = () => {
  const body = document.querySelector('body');

  const title = document.createElement('h1');
  title.classList.add('headline');
  title.textContent = 'Nonogram';
  body.append(title);

  let backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  body.append(backdrop);

  backdrop.addEventListener('click', () => {
    if (
      localStorage.getItem('nonogramsArrIndex') &&
      document.querySelector('.modal-finish').classList.contains('display-none')
    ) {
      backdrop.classList.add('display-none');
      document.querySelector('.modal-start').classList.add('display-none');
      document
        .querySelector('.modal-choose-list')
        .classList.add('display-none');
    }
  });

  createModalStart();
  createModalChooseList();

  const content = document.createElement('div');
  content.classList.add('content');
  body.append(content);

  const game = document.createElement('table');
  game.classList.add('content__game');
  content.append(game);

  const button = document.createElement('div');
  button.classList.add('content__button');
  content.append(button);

  localStorage.removeItem('nonogramsArrIndex');

  buildGame(0);

  createButtonChoseLevel();
  createButtonReset();
  createButtonSolution();
  createButtonsSave();
  createButtonsRandomGame();
};
