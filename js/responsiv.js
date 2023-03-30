let sliderMenuShown = false;

/**
 * Enables or Disable the slider menue.
 */
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.toggle('showSliderMenu');
}

/**
 * Hides slide menu on click outside of it
 */
function hideSlideMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.remove('showSliderMenu');
	sliderMenuShown = false;
}
