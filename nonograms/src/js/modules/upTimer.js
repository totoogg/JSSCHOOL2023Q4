export const upTimer = () => {
  let up = localStorage.getItem('totooggNonogramsTimer');
  if (up === 'true') {
    let time = document.querySelector('.media__timer');
    let [hours, minutes, seconds] = time.textContent.split(':').map((x) => +x);
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    time.textContent = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
};