import getCorrectWord from './lib/getCorrectWord';

export default function handleDropdownListItem(dropdownList) {
  // Define array with all quantity values from dropdown list
  const quantities = [];

  const dropdownListItemQuantities = dropdownList.querySelectorAll(
    '.js-dropdown-list-item__quantity',
  );

  dropdownListItemQuantities.forEach((item, index) => {
    const decrementButton = item.childNodes[0];
    let quantityValue = item.childNodes[1];
    const incrementButton = item.childNodes[2];

    // Push quantities to array
    quantities.push(Number(quantityValue.innerHTML));

    decrementButton.addEventListener('click', (event) => {
      let value = Number(quantityValue.innerHTML);
      if (value > 0) {
        // Change value in quantities array
        quantities[index] = value - 1;

        // Change value in user interface
        quantityValue.innerHTML = value - 1;

        // Define reduced value that will be passed to the renderQuantity function
        const reducedValue = quantities.reduce((accum, quantity) => {
          return (accum += quantity);
        }, 0);

        // Set dropdown header title to reduced value quantity with correct word
        dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
          reducedValue + ' ' + getCorrectWord(reducedValue);
      }
    });

    incrementButton.addEventListener('click', (event) => {
      let value = Number(quantityValue.innerHTML);

      // Change value in quantities array
      quantities[index] = value + 1;

      // Change value in user interface
      quantityValue.innerHTML = value + 1;

      // Define reduced value that will be passed to the renderQuantity function
      const reducedValue = quantities.reduce((accum, quantity) => {
        return (accum += quantity);
      }, 0);

      // Set dropdown header title to reduced value quantity with correct word
      dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
        reducedValue + ' ' + getCorrectWord(reducedValue);
    });
  });
}
