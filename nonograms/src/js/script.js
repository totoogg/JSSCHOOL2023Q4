import schemes from './modules/schemes.json' assert { type: 'json' };

let time;
let isTime = false;
let isPlay = true;

window.onload = function () {
  buildStartPage();
  clickSquare();
  createModal();
};

const upTimer = () => {
  let time = document.querySelector('.media__timer');
  let [hours, minutes, seconds] = time.textContent.split(':').map((x) => +x);
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  time.textContent = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const showModal = () => {
  let time = document.querySelector('.media__timer');
  let [hours, minutes, seconds] = time.textContent.split(':').map((x) => +x);
  let sum = seconds + minutes * 60 + hours * 60 * 60;
  document.querySelector('.modal__title').textContent =
    `Great! You have solved the nonogram in ${sum} seconds!`;
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
  title.textContent = `Great! You have solved the nonogram in ${0} seconds!`;
  div.append(title);
};

const returnRecord = (obj) => {
  let time = document.querySelector('.media__timer');
  let [hours, minutes, seconds] = time.textContent.split(':').map((x) => +x);
  let sum = seconds + minutes * 60 + hours * 60 * 60;
  let index = +localStorage.getItem('totooggNonogramsArrIndex');
  let name = schemes[index].name;
  let record = {
    name: name,
    time: sum,
  };
  if (index < 5) {
    obj.easy.push(record);
  } else if (index < 10) {
    obj.middle.push(record);
  } else {
    obj.hard.push(record);
  }
  for (let i in obj) {
    obj[i].sort((a, b) => a.time - b.time);
    if (obj[i].length > 5) {
      obj[i].length = 5;
    }
  }
  return obj;
};

const writeRecord = () => {
  let recordList = localStorage.getItem('totooggNonogramsArrRecordList');
  let recordObj;
  if (recordList) {
    recordObj = JSON.parse(
      localStorage.getItem('totooggNonogramsArrRecordList'),
    );
  } else {
    recordObj = {
      easy: [],
      middle: [],
      hard: [],
    };
  }
  let record = returnRecord(recordObj);
  localStorage.setItem('totooggNonogramsArrRecordList', JSON.stringify(record));
};

const checkWin = () => {
  const game = document.querySelector('.content__game');

  const brillSquare = game.querySelectorAll('.brill').length;
  const brillSquareTrue = game.querySelectorAll('.brill[data-true]').length;

  if (brillSquare === brillSquareTrue) {
    let finishSquare = game.querySelectorAll('.row__data[data-true]').length;

    if (brillSquare === finishSquare && brillSquareTrue === finishSquare) {
      if (isPlay) {
        musicPlay('src/sounds/win.mp3');
      }
      clearInterval(time);
      isTime = false;
      showModal();
      writeRecord();
    }
  }
};

const musicPlay = (src) => {
  const audio = new Audio(src);
  audio.play();
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
        if (isPlay) {
          musicPlay('src/sounds/clickRight.mp3');
        }
        td.classList.remove('brill');
        td.classList.toggle('active');
        return;
      } else {
        if (isPlay) {
          musicPlay('src/sounds/clickLeft.mp3');
        }
        td.classList.remove('active');
        td.classList.toggle('brill');
      }

      if (!isTime) {
        isTime = true;
        time = setInterval(upTimer, 1000);
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
          localStorage.setItem('totooggNonogramsArrIndex', index);

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
    clearInterval(time);
    isTime = false;
    document.querySelector('.media__timer').textContent = '00:00:00';
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
    clearInterval(time);
    isTime = false;
    document.querySelector('.media__timer').textContent = '00:00:00';
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
      index: localStorage.getItem('totooggNonogramsArrIndex'),
      arrClick: saveArr,
      time: document.querySelector('.media__timer').textContent,
    };
    localStorage.setItem(
      'totooggNonogramsArrSaveGame',
      JSON.stringify(objSave),
    );
  });

  let loading = document.createElement('button');
  loading.classList.add('save-content__button-loading');
  loading.classList.add('button');
  if (!localStorage.getItem('totooggNonogramsArrSaveGame')) {
    loading.classList.add('disabled');
  }
  loading.textContent = 'Continue the last game';
  div.append(loading);

  loading.addEventListener('click', () => {
    if (localStorage.getItem('totooggNonogramsArrSaveGame')) {
      let save = JSON.parse(
        localStorage.getItem('totooggNonogramsArrSaveGame'),
      );
      document.querySelector('.media__timer').textContent = save.time;
      buildGame(+save.index);
      let clicks = document.querySelectorAll('.row__data[data-click]');
      save.arrClick.forEach((x, index) => {
        if (x === 1) {
          clicks[index].classList.add('brill');
        } else if (x === 2) {
          clicks[index].classList.add('active');
        }
      });
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
    clearInterval(time);
    isTime = false;
    document.querySelector('.media__timer').textContent = '00:00:00';
    let random = rangeRandom(0, schemes.length - 1);
    if (random === localStorage.getItem('totooggNonogramsArrIndex')) {
      if (random === schemes.length - 1) {
        buildGame(0);
        localStorage.setItem('totooggNonogramsArrIndex', 0);
      } else {
        buildGame(random + 1);
        localStorage.setItem('totooggNonogramsArrIndex', random + 1);
      }
    } else {
      buildGame(random);
      localStorage.setItem('totooggNonogramsArrIndex', random);
    }
  });
};

const createTimer = () => {
  let block = document.querySelector('.media');

  const p = document.createElement('p');
  p.classList.add('media__timer');
  p.textContent = '00:00:00';
  block.append(p);
};

const createButtonThemes = () => {
  let block = document.querySelector('.media');

  const div = document.createElement('div');
  div.classList.add('media__themes');
  div.classList.add('sun');
  div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 63 63" style="enable-background:new 0 0 63 63;" xml:space="preserve">
  <g>
    <g id="group-6svg">
      <path id="path-1_26_" d="M32.524,63c-8.687,0-16.855-3.383-22.998-9.526S0,39.164,0,30.476c0-8.687,3.382-16.855,9.526-22.998    c3.248-3.248,7.095-5.732,11.432-7.38c0.554-0.209,1.176-0.076,1.593,0.341c0.418,0.418,0.552,1.042,0.342,1.594    c-4.128,10.864-1.499,23.18,6.697,31.376c5.565,5.564,12.967,8.629,20.842,8.629c3.619,0,7.163-0.65,10.534-1.931    c0.556-0.209,1.177-0.076,1.594,0.342c0.418,0.417,0.552,1.041,0.342,1.593c-1.648,4.338-4.132,8.184-7.381,11.432    C49.379,59.617,41.211,63,32.524,63z M19.044,4.222c-2.738,1.396-5.216,3.197-7.397,5.378C6.071,15.176,3,22.59,3,30.476    c0,7.887,3.071,15.3,8.647,20.877C17.223,56.929,24.637,60,32.524,60c7.886,0,15.3-3.071,20.876-8.647    c2.181-2.18,3.981-4.658,5.377-7.395c-2.715,0.718-5.509,1.08-8.345,1.08c-8.677,0-16.832-3.377-22.963-9.507    C19.249,27.311,16.111,15.331,19.044,4.222z"/>
    </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
  block.append(div);
  div.addEventListener('click', () => {
    if (div.classList.contains('sun')) {
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612 612" style="fill: white;enable-background:new 0 0 612 612;" xml:space="preserve">
      <g>
        <g id="_x37__5_">
          <g>
            <path d="M76.5,286.875H19.125C8.568,286.875,0,295.443,0,306c0,10.557,8.568,19.125,19.125,19.125H76.5     c10.557,0,19.125-8.568,19.125-19.125C95.625,295.443,87.057,286.875,76.5,286.875z M306,95.625     c10.557,0,19.125-8.568,19.125-19.125V19.125C325.125,8.568,316.557,0,306,0c-10.557,0-19.125,8.568-19.125,19.125V76.5     C286.875,87.057,295.443,95.625,306,95.625z M490.002,148.792l40.182-40.182c7.401-7.401,7.401-19.393,0-26.794     s-19.394-7.401-26.795,0l-40.182,40.182c-7.401,7.401-7.401,19.393,0,26.794C470.609,156.194,482.601,156.194,490.002,148.792z      M141.716,443.509l-40.182,40.182c-7.401,7.401-7.401,19.393,0,26.794s19.393,7.401,26.794,0l40.182-40.182     c7.401-7.401,7.401-19.393,0-26.794S149.118,436.107,141.716,443.509z M130.203,157.246c7.478,7.478,19.584,7.478,27.042,0     c7.459-7.478,7.459-19.584,0-27.042L116.682,89.62c-7.478-7.478-19.584-7.478-27.043,0c-7.478,7.478-7.478,19.584,0,27.043     L130.203,157.246z M306,516.375c-10.557,0-19.125,8.568-19.125,19.125v57.375c0,10.557,8.568,19.125,19.125,19.125     c10.557,0,19.125-8.568,19.125-19.125V535.5C325.125,524.943,316.557,516.375,306,516.375z M481.797,454.754     c-7.478-7.478-19.584-7.478-27.043,0c-7.478,7.479-7.478,19.584,0,27.043l40.564,40.564c7.478,7.478,19.584,7.478,27.043,0     c7.459-7.479,7.478-19.584,0-27.043L481.797,454.754z M592.875,286.875H535.5c-10.557,0-19.125,8.568-19.125,19.125     c0,10.557,8.568,19.125,19.125,19.125h57.375c10.557,0,19.125-8.568,19.125-19.125C612,295.443,603.432,286.875,592.875,286.875z      M306,133.76c-95.128,0-172.24,77.112-172.24,172.24S210.872,478.24,306,478.24S478.24,401.128,478.24,306     S401.128,133.76,306,133.76z M306,439.837c-73.918,0-133.837-59.919-133.837-133.837S232.082,172.163,306,172.163     S439.837,232.082,439.837,306S379.918,439.837,306,439.837z"/>
          </g>
        </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
      div.classList.remove('sun');
      div.classList.add('night');
    } else {
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 63 63" style="enable-background:new 0 0 63 63;" xml:space="preserve">
  <g>
    <g id="group-6svg">
      <path id="path-1_26_" d="M32.524,63c-8.687,0-16.855-3.383-22.998-9.526S0,39.164,0,30.476c0-8.687,3.382-16.855,9.526-22.998    c3.248-3.248,7.095-5.732,11.432-7.38c0.554-0.209,1.176-0.076,1.593,0.341c0.418,0.418,0.552,1.042,0.342,1.594    c-4.128,10.864-1.499,23.18,6.697,31.376c5.565,5.564,12.967,8.629,20.842,8.629c3.619,0,7.163-0.65,10.534-1.931    c0.556-0.209,1.177-0.076,1.594,0.342c0.418,0.417,0.552,1.041,0.342,1.593c-1.648,4.338-4.132,8.184-7.381,11.432    C49.379,59.617,41.211,63,32.524,63z M19.044,4.222c-2.738,1.396-5.216,3.197-7.397,5.378C6.071,15.176,3,22.59,3,30.476    c0,7.887,3.071,15.3,8.647,20.877C17.223,56.929,24.637,60,32.524,60c7.886,0,15.3-3.071,20.876-8.647    c2.181-2.18,3.981-4.658,5.377-7.395c-2.715,0.718-5.509,1.08-8.345,1.08c-8.677,0-16.832-3.377-22.963-9.507    C19.249,27.311,16.111,15.331,19.044,4.222z"/>
    </g>
  </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
      div.classList.add('sun');
      div.classList.remove('night');
    }
  });
};

const createButtonSound = () => {
  let block = document.querySelector('.media');

  const div = document.createElement('div');
  div.classList.add('media__sound');
  div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style></style></defs><title/><g data-name="Layer 34" id="Layer_34"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z"/><path class="cls-1" d="M26.48,25.48a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42,11,11,0,0,0,0-15.54,1,1,0,1,1,1.42-1.42,13,13,0,0,1,0,18.38A1,1,0,0,1,26.48,25.48Z"/><path class="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z"/></g></svg>`;
  block.append(div);
  div.addEventListener('click', () => {
    if (isPlay) {
      isPlay = false;
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style></style></defs><title/><g data-name="Layer 35" id="Layer_35"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><rect class="cls-1" height="12" transform="translate(-3.77 22.9) rotate(-45)" width="2" x="24.76" y="10"/><rect class="cls-1" height="2" transform="translate(-3.77 22.9) rotate(-45)" width="12" x="19.76" y="15"/></g></svg>`;
    } else {
      isPlay = true;
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style></style></defs><title/><g data-name="Layer 34" id="Layer_34"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z"/><path class="cls-1" d="M26.48,25.48a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42,11,11,0,0,0,0-15.54,1,1,0,1,1,1.42-1.42,13,13,0,0,1,0,18.38A1,1,0,0,1,26.48,25.48Z"/><path class="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z"/></g></svg>`;
    }
  });
};

const createModalRecord = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-record');
  div.classList.add('display-none');
  body.append(div);

  let h2 = document.createElement('h2');
  h2.classList.add('modal-record__headline');
  h2.textContent = 'Record Table';
  div.append(h2);

  let buttons = document.createElement('div');
  buttons.classList.add('modal-record__buttons');
  div.append(buttons);

  for (let i = 0; i < 3; i++) {
    let button = document.createElement('button');
    button.classList.add('buttons__record-button');
    button.classList.add('button');
    if (i === 0) {
      button.textContent = `Easy`;
      button.classList.add('active');
    }
    if (i === 1) {
      button.textContent = `Middle`;
    }
    if (i === 2) {
      button.textContent = `Hard`;
    }

    buttons.append(button);

    button.addEventListener('click', () => {
      let record = localStorage.getItem('totooggNonogramsArrRecordList');
      if (record) {
        let items = document.querySelectorAll('.list__item');
        let arrRecord = JSON.parse(record);
        if (button.textContent === 'Easy') {
          arrRecord = arrRecord.easy;
        } else if (button.textContent === 'Middle') {
          arrRecord = arrRecord.middle;
        } else {
          arrRecord = arrRecord.hard;
        }
        items.forEach((x, i) => {
          if (arrRecord[i]) {
            x.textContent = `${arrRecord[i].name} --- ${arrRecord[i].time} seconds`;
          } else {
            x.textContent = '-';
          }
        });
      }

      let buttonsRecord = document.querySelectorAll('.buttons__record-button');
      buttonsRecord.forEach((x) => x.classList.remove('active'));

      button.classList.add('active');
    });
  }

  let records = document.createElement('ol');
  records.classList.add('modal-record__list');
  div.append(records);

  for (let i = 0; i < 5; i++) {
    let record = document.createElement('li');
    record.classList.add('list__item');
    record.textContent = '-';
    records.append(record);

    let recordLocal = localStorage.getItem('totooggNonogramsArrRecordList');
    if (recordLocal) {
      let arrRecord = JSON.parse(recordLocal);
      arrRecord = arrRecord.easy;
      if (arrRecord[i]) {
        record.textContent = `${arrRecord[i].name} --- ${arrRecord[i].time} seconds`;
      }
    }
  }
};

const createButtonRecord = () => {
  let block = document.querySelector('.media');

  const button = document.createElement('button');
  button.classList.add('media__record');
  button.classList.add('button');
  button.textContent = 'Record Table';
  block.append(button);

  createModalRecord();

  button.addEventListener('click', () => {
    let modal = document.querySelector('.modal-record');
    modal.classList.remove('display-none');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('display-none');
  });
};

const buildStartPage = () => {
  const body = document.querySelector('body');

  const title = document.createElement('h1');
  title.classList.add('headline');
  title.textContent = 'Nonogram';
  body.append(title);

  const contentTimer = document.createElement('div');
  contentTimer.classList.add('media');
  body.append(contentTimer);

  let backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  body.append(backdrop);

  backdrop.addEventListener('click', () => {
    if (
      localStorage.getItem('totooggNonogramsArrIndex') &&
      document.querySelector('.modal-finish').classList.contains('display-none')
    ) {
      backdrop.classList.add('display-none');
      document.querySelector('.modal-start').classList.add('display-none');
      document.querySelector('.modal-record').classList.add('display-none');
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

  localStorage.removeItem('totooggNonogramsArrIndex');

  buildGame(0);

  createButtonChoseLevel();
  createButtonReset();
  createButtonSolution();
  createButtonsSave();
  createButtonsRandomGame();
  createTimer();
  createButtonSound();
  createButtonThemes();
  createButtonRecord();
};
