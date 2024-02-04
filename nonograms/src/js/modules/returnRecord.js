export const returnRecord = (obj) => {
  let time = document.querySelector('.media__timer');
  let [hours, minutes, seconds] = time.textContent.split(':').map((x) => +x);
  let sum = seconds + minutes * 60 + hours * 60 * 60;
  let index = +localStorage.getItem('totooggNonogramsArrIndex');
  let name = schemes[index].name;
  let record = {
    name: name,
    time: sum,
  };
  if (index < 5) {
    obj.easy.push(record);
  } else if (index < 10) {
    obj.middle.push(record);
  } else {
    obj.hard.push(record);
  }
  for (let i in obj) {
    obj[i].sort((a, b) => a.time - b.time);
    if (obj[i].length > 5) {
      obj[i].length = 5;
    }
  }
  return obj;
};