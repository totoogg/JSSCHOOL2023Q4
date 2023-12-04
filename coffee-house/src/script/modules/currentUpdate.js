import {leafingSlider} from './leafingSlider.js'

export function currentUpdate() {
  const sliderControls = document.querySelectorAll('.current')
  const sliderBlock1 = document.querySelector('.slider_1')
  let widthSlider = getComputedStyle(sliderBlock1).width
  let currentSliderElement = Math.abs(parseInt(sliderBlock1.style.marginLeft || 0)) / parseInt(widthSlider)

  if (parseInt(sliderControls[currentSliderElement].style.width || 0) < 100 ) {
    sliderControls[currentSliderElement].style.width = `${parseInt(sliderControls[currentSliderElement].style.width || 0) + 1}%`
  } else {
    sliderControls.forEach(x => x.style.width = 0)
    leafingSlider('right')
  }
}