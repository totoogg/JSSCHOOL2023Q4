import { createModalRecord } from './createModalRecord.js';

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

    let buttons = document.querySelector('.modal-record__buttons') 
    let activeButton = buttons.querySelector('.active')

    let record = localStorage.getItem('totooggNonogramsArrRecordList');
    if (record) {
      let items = document.querySelectorAll('.list__item');
      let arrRecord = JSON.parse(record);
      if (activeButton.textContent === 'Easy') {
        arrRecord = arrRecord.easy;
      } else if (activeButton.textContent === 'Middle') {
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
  });
};
