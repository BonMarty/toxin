// Can't find solution for picking days in different lazyMonths so just make solution that work only with current month

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

  // Define new Date class instance
  let date = new Date();

  // Define variables that contain current year and current month from date object
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  // Define variables for days pick
  let currentDayPick = 0;
  const maxDaysPick = 2;
  let selectedDays = [];

  // Call renderCurrentDate function immediately for display content in calendar
  import('./lib/renderCurrentDate').then((module) => {
    module.default(
      { currentDate, currentMonth, currentYear, days, date },
      {
        days,
        currentMonth,
        currentYear,
        currentDayPick,
        maxDaysPick,
        selectedDays,
        dropdownHeaderTitle,
      },
    );
  });

  if (previousMonthArrow) {
    previousMonthArrow.addEventListener('click', () => {
      // Clear all day pick stuff
      currentDayPick = 0;
      selectedDays = [];

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
      import('./lib/renderCurrentDate').then((module) => {
        module.default(
          { currentDate, currentMonth, currentYear, days, date },
          {
            days,
            currentMonth,
            currentYear,
            currentDayPick,
            maxDaysPick,
            selectedDays,
            dropdownHeaderTitle,
          },
        );
      });
    });
  }

  if (nextMonthArrow) {
    nextMonthArrow.addEventListener('click', () => {
      // Clear all day pick stuff
      selectedDays = [];
      currentDayPick = 0;

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
      import('./lib/renderCurrentDate').then((module) => {
        module.default(
          { currentDate, currentMonth, currentYear, days, date },
          {
            days,
            currentMonth,
            currentYear,
            currentDayPick,
            maxDaysPick,
            selectedDays,
            dropdownHeaderTitle,
          },
        );
      });
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      // Remove calendar-day_selected class
      days.childNodes.forEach((day) => {
        day.classList.remove('calendar-day_selected');
        day.classList.remove('calendar-day_first-in-selected');
        day.classList.remove('calendar-day_last-in-selected');
        day.classList.remove('calendar-day_in-range');
      });
      dropdownHeaderTitle.childNodes[0].data = dropdownHeaderTitleDefaultValue;
      currentDayPick = 0;
      selectedDays = [];

      // Call renderCurrentDate function to update value
      import('./lib/renderCurrentDate').then((module) => {
        module.default(
          { currentDate, currentMonth, currentYear, days, date },
          {
            days,
            currentMonth,
            currentYear,
            currentDayPick,
            maxDaysPick,
            selectedDays,
            dropdownHeaderTitle,
          },
        );
      });
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
