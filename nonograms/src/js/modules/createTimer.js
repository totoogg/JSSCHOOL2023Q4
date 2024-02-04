export const createTimer = () => {
  let block = document.querySelector('.media');

  const p = document.createElement('p');
  p.classList.add('media__timer');
  p.textContent = '00:00:00';
  block.append(p);
};