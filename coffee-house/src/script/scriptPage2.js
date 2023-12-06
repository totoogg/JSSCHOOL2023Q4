import products from './modules/products.json' assert {type: 'json'};

const burgerMenu = document.querySelector('.burger_menu')
const navigation = document.querySelector('.header__navigation_button')
const navigationLink = document.querySelectorAll('.navigation__item__link')
const html = document.querySelector('html')
const logo = document.querySelector('.header__logo')
const menuLink = document.querySelector('.header__menu-link')

const menuRadioBox = document.querySelector('.menu__radio_box')

let currentProducts

const menuUpdate = document.querySelector('.menu__update')
const menuProduct = document.querySelector('.menu__product')
const productContent = document.querySelectorAll('.product__content')


//    Burger


burgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('active')
  burgerMenu.classList.toggle('active')
  html.classList.toggle('block')
})

logo.addEventListener('click', () => {
  navigation.classList.remove('active')
  burgerMenu.classList.remove('active')
  html.classList.remove('block')
})

menuLink.addEventListener('click', () => {
  navigation.classList.remove('active')
  burgerMenu.classList.remove('active')
  html.classList.remove('block')
})

navigationLink.forEach(x => {
  x.addEventListener('click', () => {
    navigation.classList.remove('active')
    burgerMenu.classList.remove('active')
    html.classList.remove('block')
  })
})


//    Menu radio


menuRadioBox.addEventListener('mousedown', (event) => {
  let input = event.target.closest('.radio_box__button')?.children[0].value

  if (input && input !== menuRadioBox.querySelector('input:checked').value) {
    currentProducts = products.filter(x => x.category === input)
    if (currentProducts.length < 5) {
      menuUpdate.classList.add('display-none')
      menuProduct.classList.add('update_min')
      
    } else {
      menuUpdate.classList.remove('display-none')
      menuProduct.classList.remove('update_min')
    }
    
    menuProduct.classList.remove('update')
    
    menuProduct.innerHTML = ''

    currentProducts.forEach((x, i) => {
      let cloneProduct = productContent[0].cloneNode(true)
      cloneProduct.querySelector('img').src = x.img
      cloneProduct.querySelector('.description__content__title').textContent = x.name
      cloneProduct.querySelector('.description__content__text').textContent = x.description
      cloneProduct.querySelector('.description__price').textContent = x.price
      if (i > 3) {
        cloneProduct.classList.add('display-none')
      }
      menuProduct.append(cloneProduct)
    })
  }
})

console.log(products)

menuUpdate.addEventListener('click', () => {
  menuProduct.classList.add('update')
  menuUpdate.classList.add('display-none')

  document.querySelectorAll('.product__content').forEach(x => {
    x.classList.remove('display-none')
  })
})


//    PopUP

menuProduct.addEventListener('click', (event) => {
  if (event.target.closest('.product__content')) {
    console.log(1)
  }
})