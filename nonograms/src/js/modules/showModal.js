export const showModal = () => {
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