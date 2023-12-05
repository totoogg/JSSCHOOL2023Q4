

const burgerMenu = document.querySelector('.burger_menu')
const navigation = document.querySelector('.header__navigation_button')
const navigationLink = document.querySelectorAll('.navigation__item__link')
const body = document.querySelector('body')
const logo = document.querySelector('.header__logo')
const menuLink = document.querySelector('.header__menu-link')


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


//    Menu radio