// Define all sliders
const sliders = document.querySelectorAll('.slider');

// Iterate through all sliders
sliders.forEach((slider) => {
  // Define price gap
  const priceGap = 1500;

  // Define range inputs
  const rangeInputs = slider.querySelectorAll('.slider-bar__range-input');

  // Define progress bar
  const progress = slider.querySelector('.slider-bar__progress');

  // Define slider header with price range
  const sliderHeaderRange = slider.querySelector('.slider-header__range');

  rangeInputs.forEach((input) => {
    // Add input addEventListener to all rangeInputs
    input.addEventListener('input', (event) => {
      // Define min value input and max value input
      let minVal = parseInt(rangeInputs[0].value);
      let maxVal = parseInt(rangeInputs[1].value);

      // Define percent that need to left property of slider-bar__progress
      let leftPercent = (minVal / rangeInputs[0].max) * 100;

      // Define percent that need to right property of slider-bar__progress
      let rightPercent = (maxVal / rangeInputs[1].max) * 100;

      // Condition that checks if price range in less than priceGap variable value
      if (maxVal - minVal < priceGap) {
        // Check if min slider selected
        if (event.target.className.includes('range-min')) {
          rangeInputs[0].value = maxVal - priceGap;
        } else {
          rangeInputs[1].value = minVal + priceGap;
        }
      } else {
        // Apply styles to slider-bar__progress
        progress.style.left = leftPercent + '%';
        progress.style.right = 100 - rightPercent + '%';

        // Apply values to slider header
        sliderHeaderRange.childNodes[0].innerHTML = `${minVal}₽`;
        sliderHeaderRange.childNodes[2].innerHTML = `${maxVal}₽`;
      }
    });
  });
});
