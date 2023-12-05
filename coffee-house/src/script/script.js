import {leafingSlider} from './modules/leafingSlider.js'
import {currentUpdate} from './modules/currentUpdate.js'

const burgerMenu = document.querySelector('.burger_menu')
const navigation = document.querySelector('.header__navigation_button')
const navigationLink = document.querySelectorAll('.navigation__item__link')
const body = document.querySelector('body')
const logo = document.querySelector('.header__logo')
const menuLink = document.querySelector('.header__menu-link')

const sliderContentBocks = document.querySelector('.slider__content__blocks')
const sliderBlock1 = document.querySelector('.slider_1')
const buttonSliderLeft = document.querySelector('.arrow_left')
const buttonSliderRight = document.querySelector('.arrow_right')


let timerCurrent
let clickDownX = 0


//    Burger


burgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('active')
  burgerMenu.classList.toggle('active')
  body.classList.toggle('block')
})

logo.addEventListener('click', () => {
  navigation.classList.remove('active')
  burgerMenu.classList.remove('active')
  body.classList.remove('block')
})

menuLink.addEventListener('click', () => {
  navigation.classList.remove('active')
  burgerMenu.classList.remove('active')
  body.classList.remove('block')
})

navigationLink.forEach(x => {
  x.addEventListener('click', () => {
    navigation.classList.remove('active')
    burgerMenu.classList.remove('active')
    body.classList.remove('block')
  })
})


//    Slider


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