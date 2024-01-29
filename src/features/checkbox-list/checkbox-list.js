const checkboxLists = document.querySelectorAll('.js-checkbox-list');

checkboxLists.forEach((list) => {
  const checkboxListHeader = list.querySelector('.js-checkbox-list-header');
  const checkboxListHeaderArrow = checkboxListHeader.childNodes[1];

  const checkboxListItems = list.querySelector('.js-checkbox-list-items');

  checkboxListHeader.addEventListener('click', () => {
    checkboxListHeaderArrow.classList.toggle('checkbox-list-header__arrow_expanded');
    checkboxListItems.classList.toggle('checkbox-list-items_expanded');
  });
});
