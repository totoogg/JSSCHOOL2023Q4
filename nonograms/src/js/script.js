import schemes from './modules/schemes.json' assert { type: 'json' };

window.onload = function () {
  console.log(schemes);
  buildStartPage();
};

const buildGame = (number) => {
  const playField = schemes[number].scheme;

  const gameTable = document.querySelector('.game');

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

    for (let j = 1; j < dates.length; j++) {
      if (playField[j - 1][i - 1]) {
        countTop++;
      }

      if (
        (j === playField[i - 1].length || !playField[j - 1][i - 1]) &&
        countTop > 0
      ) {
        let dataZero = gameRow[0].querySelectorAll('.row__data')[i];
        dataZero.classList.add('top-key')
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
        let dataZero = gameRow[i].querySelectorAll('.row__data')[0];
        dataZero.classList.add('left-key')
        const numberKey = document.createElement('span');
        numberKey.classList.add('key');
        numberKey.textContent = countLeft;
        dataZero.append(numberKey);
        countLeft = 0;
      }

      if (playField[i - 1][j - 1]) {
        dates[j].setAttribute('data-true', 'true');
      }
    }
  }
};

const buildStartPage = () => {
  const body = document.querySelector('body');

  const game = document.createElement('table');
  game.classList.add('game');
  body.append(game);

  buildGame(14); //random
};
