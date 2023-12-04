import {leafingSlider} from './modules/leafingSlider.js'
import {currentUpdate} from './modules/currentUpdate.js'


const sliderContentBocks = document.querySelector('.slider__content__blocks')
const sliderBlock1 = document.querySelector('.slider_1')
const buttonSliderLeft = document.querySelector('.arrow_left')
const buttonSliderRight = document.querySelector('.arrow_right')


let timerCurrent
let clickDownX = 0


buttonSliderLeft.addEventListener('click', () => {
  leafingSlider('left')
})

buttonSliderRight.addEventListener('click', () => {
  leafingSlider('right')
})

sliderContentBocks.addEventListener('touchstart', (event) => {
  event.preventDefault()
  clickDownX = event.changedTouches[0].clientX
  currentStop()
})

sliderContentBocks.addEventListener('touchend', () => {
  currentStart()
})

sliderContentBocks.addEventListener('pointerdown', (event) => {
  event.preventDefault()
  clickDownX = event.clientX
})

sliderContentBocks.addEventListener('pointerup', (event) => {
  let resultX = clickDownX - event.clientX
  if (resultX > (parseInt(getComputedStyle(sliderBlock1).width) / 2)) {
    leafingSlider('right')
  }
  if (resultX < 0 && Math.abs(resultX) > (parseInt(getComputedStyle(sliderBlock1).width) / 2)) {
    leafingSlider('left')
  }
})

sliderContentBocks.addEventListener('mouseover', () => {
  currentStop()
})

sliderContentBocks.addEventListener('mouseout', () => {
  currentStart()
})

currentStart()

function currentStart() {
  timerCurrent = setInterval(currentUpdate, 50);
  currentUpdate();
}

function currentStop() {
  clearInterval(timerCurrent);
  timerCurrent = null;
}