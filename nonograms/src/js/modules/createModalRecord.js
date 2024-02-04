export const createModalRecord = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-record');
  div.classList.add('display-none');
  body.append(div);

  let h2 = document.createElement('h2');
  h2.classList.add('modal-record__headline');
  h2.textContent = 'Record Table';
  div.append(h2);

  let buttons = document.createElement('div');
  buttons.classList.add('modal-record__buttons');
  div.append(buttons);

  for (let i = 0; i < 3; i++) {
    let button = document.createElement('button');
    button.classList.add('buttons__record-button');
    button.classList.add('button');
    if (i === 0) {
      button.textContent = `Easy`;
      button.classList.add('active');
    }
    if (i === 1) {
      button.textContent = `Middle`;
    }
    if (i === 2) {
      button.textContent = `Hard`;
    }

    buttons.append(button);

    button.addEventListener('click', () => {
      let record = localStorage.getItem('totooggNonogramsArrRecordList');
      if (record) {
        let items = document.querySelectorAll('.list__item');
        let arrRecord = JSON.parse(record);
        if (button.textContent === 'Easy') {
          arrRecord = arrRecord.easy;
        } else if (button.textContent === 'Middle') {
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

      let buttonsRecord = document.querySelectorAll('.buttons__record-button');
      buttonsRecord.forEach((x) => x.classList.remove('active'));

      button.classList.add('active');
    });
  }

  let records = document.createElement('ol');
  records.classList.add('modal-record__list');
  div.append(records);

  for (let i = 0; i < 5; i++) {
    let record = document.createElement('li');
    record.classList.add('list__item');
    record.textContent = '-';
    records.append(record);

    let recordLocal = localStorage.getItem('totooggNonogramsArrRecordList');
    if (recordLocal) {
      let arrRecord = JSON.parse(recordLocal);
      arrRecord = arrRecord.easy;
      if (arrRecord[i]) {
        record.textContent = `${arrRecord[i].name} --- ${arrRecord[i].time} seconds`;
      }
    }
  }
};