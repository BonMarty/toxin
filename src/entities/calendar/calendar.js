import { months } from './lib/months';

const calendars = document.querySelectorAll('.js-calendar');

calendars.forEach((calendar) => {
  // Define dropdown header and default value
  const dropdownHeaderTitle = calendar.offsetParent.offsetParent.childNodes[1].childNodes[0];
  const dropdownHeaderTitleDefaultValue = dropdownHeaderTitle.childNodes[0].data;

  // Define currentDate that displays current month and year in calendar header
  const currentDate = calendar.querySelector('.js-current-date');

  // Define calendar-days that is wrapper for every calendar-day
  const days = calendar.querySelector('.js-calendar-days');

  // Define arrows
  const previousMonthArrow = calendar.querySelector('.js-prev-month');
  const nextMonthArrow = calendar.querySelector('.js-next-month');

  // Define calendar buttons
  const clearButton = calendar.querySelector('.js-calendar-button_clear');
  const applyButton = calendar.querySelector('.js-calendar-button_apply');

  // Define variables for days pick
  let currentDayPick = 0;
  const maxDaysPick = 2;
  let selectedDays = [];

  // Define new Date class instance
  let date = new Date();

  // Define variables that contain current year and current month from date object
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  // Function that renders current date in calendar-header
  function renderCurrentDate() {
    // Define first day of current month
    let firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();

    // Define last date of current month
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Define last day of current month
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();

    // Define last date of previous month
    let lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Define single li tag that contains each day
    let dayLiTag = '';

    // For loop where add days from previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      dayLiTag += `<li class="calendar-day calendar-day_inactive">${
        lastDateOfPreviousMonth - i + 1
      }</li>`;
    }

    // For loop where add days from current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      // Define variable that contains boolean value for isToday condition
      const isToday =
        i === date.getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
          ? true
          : false;

      if (isToday) {
        dayLiTag += `<li class="calendar-day today">${i}</li>`;
      } else {
        dayLiTag += `<li class="calendar-day">${i}</li>`;
      }
    }

    // For loop where add last day of month
    for (let i = lastDayOfMonth; i <= 6; i++) {
      // Check if lastDayOfMonth > 0 because if it equals 0 add a whole row with inactive calendar days
      // Example with lastDayOfMonth = 0
      // 25 26 27 28 29 30 31
      // 1 2 3 4 5 6 7 -> this is problem

      // Example with lastDayOfMonth > 0
      // 25 26 27 28 29 30 31
      // Out of problem
      if (lastDayOfMonth > 0) {
        dayLiTag += `<li class="calendar-day calendar-day_inactive">${i - lastDayOfMonth + 1}</li>`;
      }
    }

    if (currentDate) {
      // Set currentDate
      currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;
    }

    if (days) {
      // Set days
      days.innerHTML = dayLiTag;

      // Call handleDayClick function that handle user clicks on day
      handleDayClick();
    }
  }
  // Call renderCurrentDate function immediately for display content in calendar
  renderCurrentDate();

  // Function that handle user click on day
  function handleDayClick() {
    if (days) {
      // Iterate through days array and add addEventListener that toggle calendar-day_selected class
      days.childNodes.forEach((day) => {
        day.addEventListener('click', (event) => {
          // Condition that check if user select two or less days and check if day is not clickable (previous month days or next month days)
          if (currentDayPick < maxDaysPick && !day.classList.contains('calendar-day_inactive')) {
            // Increment variable that stores user clicks
            currentDayPick += 1;
            day.classList.add('calendar-day_selected');

            // Define day that user choose
            const selectedDay = event.target.childNodes[0].data;

            // Add this day to selectedDays array
            selectedDays.push(selectedDay);

            // If user select one day it will show this day in dropdownHeaderTitle
            // Example -> 1.1.1111
            if (selectedDays.length === 1) {
              dropdownHeaderTitle.childNodes[0].data = `${selectedDays[0]}.${
                currentMonth + 1
              }.${currentYear}`;
            }

            // If user select two days it will show days period
            // Example -> 1 Jan - 2 Jan
            if (selectedDays.length === 2) {
              dropdownHeaderTitle.childNodes[0].data = `${selectedDays[0]} ${months[
                currentMonth
              ].slice(0, 3)} - ${selectedDays[1]} ${months[currentMonth].slice(0, 3)}`;
            }
          }
        });
      });
    }
  }

  if (previousMonthArrow) {
    previousMonthArrow.addEventListener('click', () => {
      // Decrementing currentMonth value by clicking on previous month arrow
      currentMonth -= 1;

      // If user reach previous year
      if (currentMonth < 0) {
        // Creating new Date class instance and pass it as a value
        date = new Date(currentYear, currentMonth);

        // Update currentYear and currentMonth with new date
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
      } else {
        // Else pass new Date class instance as a value
        date = new Date();
      }

      // Call renderCurrentDate function to update value
      renderCurrentDate();
    });
  }

  if (nextMonthArrow) {
    nextMonthArrow.addEventListener('click', () => {
      // Incrementing currentMonth value by clicking on next month arrow
      currentMonth += 1;

      // If user reach next year
      if (currentMonth > 11) {
        // Creating new Date class instance and pass it as a value
        date = new Date(currentYear, currentMonth);

        // Update currentYear and currentMonth with new date
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
      } else {
        // Else pass new Date class instance as a value
        date = new Date();
      }

      // Call renderCurrentDate function to update value
      renderCurrentDate();
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      // Remove calendar-day_selected class
      days.childNodes.forEach((day) => day.classList.remove('calendar-day_selected'));
      dropdownHeaderTitle.childNodes[0].data = dropdownHeaderTitleDefaultValue;
      currentDayPick = 0;
      selectedDays = [];
    });
  }

  if (applyButton) {
    applyButton.addEventListener('click', () => {
      const dropdownHeaderArrow = calendar.offsetParent.offsetParent.querySelector(
        '.js-dropdown-header__arrow',
      );
      const dropdownCalendar =
        calendar.offsetParent.offsetParent.querySelector('.js-dropdown-calendar');

      // Remove dropdown-calendar_active class
      dropdownCalendar.classList.remove('dropdown-calendar_visible');
      dropdownHeaderArrow.classList.remove('dropdown-header__arrow_expanded');
    });
  }
});
