export const createButtonReset = () => {
  const body = document.querySelector('.content__button');

  let button = document.createElement('button');
  button.classList.add('reset');
  button.classList.add('button');
  button.textContent = 'Reset game';
  body.append(button);

  button.addEventListener('click', () => {
    localStorage.setItem('totooggNonogramsTimer', false);
    document.querySelector('.media__timer').textContent = '00:00:00';
    document.querySelector('.solution__block')?.remove();
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