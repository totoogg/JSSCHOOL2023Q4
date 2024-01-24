import schemes from './modules/schemes.json' assert { type: 'json' };

window.onload = function () {
  console.log(schemes);
  buildStartPage();
};

const buildGame = (number) => {
  const playField = schemes[number].scheme;

  const gameFieldPressing = document.querySelector('.field__pressing');
  const gameFieldLeft = document.querySelector('.game__key-left');
  const gameFieldKey = document.querySelector('.field__key');

  gameFieldPressing.innerHTML = '';
  gameFieldLeft.innerHTML = '';
  gameFieldKey.innerHTML = '';

  for (let i = 0; i < schemes[number].size / 5; i++) {
    const field = document.createElement('div');
    field.classList.add('pressing__part');
    field.setAttribute('data-part', `${i}`);
    gameFieldPressing.append(field);

    const fieldKeyLeft = document.createElement('div');
    fieldKeyLeft.classList.add('key-left__part');
    gameFieldLeft.append(fieldKeyLeft);
  }

  for (let i = 0; i < playField.length; i++) {
    const part =
      document.querySelectorAll('.pressing__part')[Math.floor(i / 5)];
    const partKeyLeft =
      document.querySelectorAll('.key-left__part')[
        +part.getAttribute('data-part')
      ];
    const partKeyTop = document.querySelector('.field__key');

    const divLeft = document.createElement('div');
    divLeft.classList.add('part__key');
    partKeyLeft.append(divLeft);

    const divTop = document.createElement('div');
    divTop.classList.add('key__content');
    partKeyTop.append(divTop);

    let count = 0;
    let countLeft = 0

    for (let j = 0; j < playField[i].length; j++) {

      if (playField[j][i]) {
        count++;
      }

      if ((j === playField[i].length - 1 || !playField[j][i]) && count > 0) {
        const numberKey = document.createElement('div');
        numberKey.classList.add('key');
        numberKey.textContent = count;
        divTop.append(numberKey);
        count = 0;
      }

      if (playField[i][j]) {
        countLeft++;
      }

      if ((j === playField[i].length - 1 || !playField[i][j]) && countLeft > 0) {
        const numberKey = document.createElement('div');
        numberKey.classList.add('key');
        numberKey.textContent = countLeft;
        divLeft.append(numberKey);
        countLeft = 0;
      }

      const div = document.createElement('div');
      div.classList.add('part__square');

      if (playField[i][j]) {
        div.setAttribute('data-true', 'true');
      }

      part.append(div);
    }
  }
};

const buildStartPage = () => {
  const body = document.querySelector('body');

  const game = document.createElement('div');
  game.classList.add('game');
  body.append(game);

  const gameKeyLeft = document.createElement('div');
  gameKeyLeft.classList.add('game__key-left');
  game.append(gameKeyLeft);

  const gameField = document.createElement('div');
  gameField.classList.add('game__field');
  game.append(gameField);

  const gameFieldKey = document.createElement('div');
  gameFieldKey.classList.add('field__key');
  gameField.append(gameFieldKey);

  const gameFieldPressing = document.createElement('div');
  gameFieldPressing.classList.add('field__pressing');
  gameField.append(gameFieldPressing);

  buildGame(14); //random
};
