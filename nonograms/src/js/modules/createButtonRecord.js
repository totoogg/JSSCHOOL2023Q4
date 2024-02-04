import { createModalRecord } from "./createModalRecord.js";

export const createButtonRecord = () => {
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