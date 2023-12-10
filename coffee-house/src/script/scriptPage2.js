import products from './modules/products.json' assert {type: 'json'};

const burgerMenu = document.querySelector('.burger_menu')
const navigation = document.querySelector('.header__navigation_button')
const navigationLink = document.querySelectorAll('.navigation__item__link')
const html = document.querySelector('html')
const logo = document.querySelector('.header__logo')
const menuLink = document.querySelector('.header__menu-link')

const menuRadioBox = document.querySelector('.menu__radio_box')

let currentProducts
let productCurrent

const menuUpdate = document.querySelector('.menu__update')
const menuProduct = document.querySelector('.menu__product')
const productContent = document.querySelectorAll('.product__content')

const popUp = document.querySelector('.menu__pop_up')
const backdrop = document.querySelector('.backdrop')
const popUpButton = document.querySelector('.pop_up__description__button')
const popUpTitle = document.querySelector('.basic__title')
const popUpText = document.querySelector('.basic__text')
const popUpPrice = document.querySelector('.price__cost')
const popUpImg = document.querySelector('.pop_up__image img')
const popUpLabel = document.querySelectorAll('.label_text')
const popUpLabelIcon = popUp.querySelectorAll('.label_icon')
const popUpRadio = popUp.querySelector('.menu__radio_box:has(input[type="radio"])')
const popUpCheckbox = popUp.querySelector('.menu__radio_box:has(input[type="checkbox"])')


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
  let input = event.target.closest('.radio__label')?.innerText.toLowerCase()
  if (input) {
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

menuUpdate.addEventListener('click', () => {
  menuProduct.classList.add('update')
  menuUpdate.classList.add('display-none')

  document.querySelectorAll('.product__content').forEach(x => {
    x.classList.remove('display-none')
  })
})


//    PopUP

menuProduct.addEventListener('click', (event) => {
  let product = event.target.closest('.product__content')

  if (product) {
    popUp.classList.remove('display-none')
    backdrop.classList.remove('display-none')
    html.classList.toggle('block')

    let productSearch = product.querySelector('.description__content__title').innerHTML
    productCurrent = products.find(x => x.name === productSearch)

    let popUpLabelIconText = [... popUpLabelIcon].map(x => x.innerHTML.toLowerCase())

    popUpLabel.forEach((x, i) => {
      if (isNaN(popUpLabelIconText[i])) {
        x.textContent = productCurrent.sizes[popUpLabelIconText[i]].size
      } else {
        x.textContent = productCurrent.additives[+popUpLabelIconText[i] - 1].name
      }
    })

    popUpTitle.textContent = productCurrent.name
    popUpText.textContent = productCurrent.description
    popUpPrice.textContent = `$${productCurrent.price}`
    popUpImg.src = productCurrent.img
  }
})

backdrop.addEventListener('click', () => {
  closePopUp()
})

popUpButton.addEventListener('click', () => {
  closePopUp()
})

popUpRadio.addEventListener('mousedown', (event) => {
  let radio = event.target.closest('.radio__label')?.children[0].innerHTML.toLowerCase()
  if (radio) {
    let countCheckbox = 0
    popUpCheckbox.querySelectorAll('input').forEach(x => {
      if (x.checked) countCheckbox++
    })
    popUpPrice.textContent = `$${(parseFloat(productCurrent.price) + parseFloat(productCurrent.sizes[radio]['add-price']) + countCheckbox * 0.5).toFixed(2)}`
  }
})

popUpCheckbox.addEventListener('click', (event) => {
  let countCheckbox = 0
  popUpCheckbox.querySelectorAll('input').forEach(x => {
    if (x.checked) countCheckbox++
  })
  let currentRadio = popUpRadio.querySelector('input:checked').labels[0].children[0].innerHTML.toLowerCase()
    
  popUpPrice.textContent = `$${(parseFloat(productCurrent.price) + parseFloat(productCurrent.sizes[currentRadio]['add-price']) + countCheckbox * 0.5).toFixed(2)}`
})


function closePopUp() {
  popUp.classList.add('display-none')
  backdrop.classList.add('display-none')
  html.classList.remove('block')

  popUpRadio.querySelector('input').checked = true
  popUpCheckbox.querySelectorAll('input').forEach(x => {
    x.checked = false
  })
}