// Define dropdown header, expand arrow and dropdown list
const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownHeaderArrow = document.querySelector('.dropdown-header__arrow');
const dropdownList = document.querySelector('.dropdown-list');

// Define dropdown list action buttons
const dropdownClearButton = document.querySelector('.dropdown-list__button_clear');
const dropdownApplyButton = document.querySelector('.dropdown-list__button_apply');

dropdownHeader.addEventListener('click', () => {
  // Toggle class that rotate arrow
  dropdownHeaderArrow.classList.toggle('dropdown-header__arrow_expanded');

  // Toggle class that shows dropdown list
  dropdownList.classList.toggle('dropdown-list_expanded');
});

dropdownClearButton.addEventListener('click', () => {
  // Define all dropdown items quantities
  const dropdownListItemQuantities = document.querySelectorAll('.dropdown-list-item__quantity');

  // Foreach loop where text value of quantity sets to zero
  dropdownListItemQuantities.forEach((item) => {
    item.childNodes[1].innerHTML = 0;
  });
});

dropdownApplyButton.addEventListener('click', () => {
  dropdownHeaderArrow.classList.remove('dropdown-header__arrow_expanded');
  dropdownList.classList.remove('dropdown-list_expanded');
});
