import handleDropdownListItem from '../../entities/dropdown-list-item/dropdown-list-item';

// Define all dropdowns
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
  // Define all components in dropdown
  const dropdownHeader = dropdown.querySelector('.dropdown-header');
  const dropdownHeaderTitle = dropdown.querySelector('.dropdown-header__title');
  const dropdownHeaderArrow = dropdown.querySelector('.dropdown-header__arrow');
  const dropdownList = dropdown.querySelector('.dropdown-list');
  const dropdownCalendar = dropdown.querySelector('.dropdown-calendar');

  const dropdownClearButton = dropdown.querySelector('.dropdown-list__button_clear');
  const dropdownApplyButton = dropdown.querySelector('.dropdown-list__button_apply');

  // Create variable with initial dropdown header value
  const dropdownHeaderTitleDefaultValue = dropdownHeaderTitle?.childNodes[0].data;

  if (dropdownHeader) {
    if (dropdownList) {
      // Call handleDropdownListItem function with passed dropdownList that run code in dropdown-list-item.js
      handleDropdownListItem(dropdownList);
    }

    dropdownHeader.addEventListener('click', () => {
      // Toggle class that rotate arrow
      dropdownHeaderArrow.classList.toggle('dropdown-header__arrow_expanded');

      if (dropdownList) {
        // Toggle class that shows dropdown list
        dropdownList.classList.toggle('dropdown-list_expanded');
      }

      if (dropdownCalendar) {
        // Toggle class that shows dropdown calendar
        dropdownCalendar.classList.toggle('dropdown-calendar_visible');
      }
    });
  }

  if (dropdownClearButton) {
    dropdownClearButton.addEventListener('click', () => {
      // Define all dropdown items quantities
      const dropdownListItemQuantities = document.querySelectorAll('.dropdown-list-item__quantity');

      // Foreach loop where text value of quantity sets to zero
      dropdownListItemQuantities.forEach((item) => {
        item.childNodes[1].innerHTML = 0;
      });

      // When user press clear button this reset text from calculated value to initial value
      // Example
      // Calculated value -> 3 guests
      // Initial value -> How many guests
      dropdownHeaderTitle.innerHTML = dropdownHeaderTitleDefaultValue;
    });
  }

  if (dropdownApplyButton) {
    dropdownApplyButton.addEventListener('click', () => {
      dropdownHeaderArrow.classList.remove('dropdown-header__arrow_expanded');
      dropdownList.classList.remove('dropdown-list_expanded');
    });
  }
});
