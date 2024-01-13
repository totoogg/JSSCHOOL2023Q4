import { showModal } from "./showModal.js";

export const updateMiss = () => {
  let miss = document.querySelector('.miss__current').textContent[0];
  if (+miss === 5) {
    showModal('loss');
  }
  document.querySelector('.miss__current').textContent = `${+miss + 1} / 6`;
  let hangman = document.querySelector('.hangman');
  hangman.querySelectorAll('.display-none')[0].classList.remove('display-none');
};