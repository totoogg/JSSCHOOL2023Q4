import { createModal } from './modules/createModal.js';
import { clickSquare } from './modules/clickSquare.js';
import { buildStartPage } from './modules/buildStartPage.js';

window.onload = function () {
  buildStartPage();
  clickSquare();
  createModal();
};
