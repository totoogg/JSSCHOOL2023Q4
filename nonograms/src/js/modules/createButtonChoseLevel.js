export const createButtonChoseLevel = () => {
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