export const createButtonSolution = () => {
  const body = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('solution');
  button.classList.add('button');
  button.textContent = 'Solution';
  body.append(button);

  let div = document.createElement('div');
  div.classList.add('solution__block');
  div.classList.add('display-none');
  document.querySelector('.content__game').append(div);

  button.addEventListener('click', () => {
    localStorage.setItem('totooggNonogramsTimer', false);
    document.querySelector('.media__timer').textContent = '00:00:00';
    if (!document.querySelector('.solution__block')) {
      let div = document.createElement('div');
      div.classList.add('solution__block');
      document.querySelector('.content__game').append(div);
    }
    let arr = document.querySelectorAll('.row__data[data-true]');
    let arrClick = document.querySelectorAll('.row__data[data-click]');
    arrClick.forEach((x) => {
      if (x.classList.contains('night')) {
        x.classList = 'row__data night';
      } else {
        x.classList = 'row__data';
      }
    });
    arr.forEach((x) => {
      x.classList.add('brill');
    });
  });
};