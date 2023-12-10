export function leafingSlider(direction) {
  const sliderControls = document.querySelectorAll('.current')
  const sliderBlock1 = document.querySelector('.slider_1')
  let widthSlider = getComputedStyle(sliderBlock1).width

  sliderControls.forEach(x => x.style.width = 0)
  if (direction === 'right') {
    if (parseInt(sliderBlock1.style.marginLeft) <= (-parseInt(widthSlider) * 2)) {
      sliderBlock1.style.marginLeft = ''
    } else if (sliderBlock1.style.marginLeft === '') {
      sliderBlock1.style.marginLeft = `-${widthSlider}`
    } else {
      sliderBlock1.style.marginLeft = `${parseInt(sliderBlock1.style.marginLeft) - parseInt(widthSlider)}px`
    } 
  } else {
    if (sliderBlock1.style.marginLeft === '' || +parseInt(sliderBlock1.style.marginLeft) === 0) {
      sliderBlock1.style.marginLeft = `${-parseInt(widthSlider) * 2}px`
    } else {
      sliderBlock1.style.marginLeft = `${parseInt(sliderBlock1.style.marginLeft) + parseInt(widthSlider)}px`
    }
  }
}