let dropdownListItemQuantities = document.querySelectorAll('.dropdown-list-item__quantity');

dropdownListItemQuantities.forEach((item) => {
  const decrementButton = item.childNodes[0];
  let quantityValue = item.childNodes[1];
  const incrementButton = item.childNodes[2];

  decrementButton.addEventListener('click', () => {
    let value = Number(quantityValue.innerHTML);
    if (value > 0) {
      quantityValue.innerHTML = value - 1;
    }
  });

  incrementButton.addEventListener('click', () => {
    let value = Number(quantityValue.innerHTML);
    quantityValue.innerHTML = value + 1;
  });
});
