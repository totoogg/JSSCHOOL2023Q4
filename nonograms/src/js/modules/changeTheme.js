export const changeTheme = () => {
  let body = document.querySelector('body');
  let sound = document.querySelector('.media__sound');
  let timer = document.querySelector('.media__timer');
  let game = document.querySelector('.content__game');
  let gameRow = document.querySelectorAll('.game__row');
  let gameRowData = document.querySelectorAll('.row__data');

  body.classList.toggle('night');
  sound.classList.toggle('night');
  timer.classList.toggle('night');
  game.classList.toggle('night');
  gameRow.forEach((x) => x.classList.toggle('night'));
  gameRowData.forEach((x) => x.classList.toggle('night'));
};