export const createModalChooseList = () => {
  const body = document.querySelector('body');

  let div = document.createElement('div');
  div.classList.add('modal-choose-list');
  div.classList.add('display-none');
  body.append(div);
};