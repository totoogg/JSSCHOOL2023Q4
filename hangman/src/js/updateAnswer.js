import { showModal } from "./showModal.js";

export const updateAnswer = (letter, arrAnswer) => {
  let answer = document.querySelectorAll('.answer__letter');
  arrAnswer.forEach((x, i) => {
    if (x === letter) {
      answer[i].textContent = letter;
    }
  });
  let arr = Array.from(answer)
    .map((x) => x.textContent)
    .filter((x) => x === '_');
  if (arr.length === 0) {
    showModal('win');
  }
};