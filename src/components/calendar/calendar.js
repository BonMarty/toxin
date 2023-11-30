// List of months
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

// Define currentDate that displays current month and year in calendar header
const currentDate = document.querySelector('.current-date');

// Define days that is wrapper for every calendar-day
const days = document.querySelector('.calendar-days');

// Define arrows
const previousMonthArrow = document.querySelector('.prev-month');
const nextMonthArrow = document.querySelector('.next-month');

// Define calendar buttons
const clearButton = document.querySelector('.calendar-button_clear');
const applyButton = document.querySelector('.calendar-button_apply');

// Define new Date class instance
let date = new Date();

// Define variables that contain current year and current month from date object
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

// Function that renders current date in calendar-header
const renderCurrentDate = () => {
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

  // Set currentDate
  currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // Set days
  days.innerHTML = dayLiTag;
};

// Call renderCurrentDate function immediately for display content in calendar
renderCurrentDate();

// IIFE that add addEventListener to days that were generated in renderCurrentDate
const handleDayClick = (() => {
  // Iterate through days array and add addEventListener that toggle calendar-day_selected class
  days.addEventListener('click', (event) => {
    days.childNodes.forEach((day) => day.classList.remove('calendar-day_selected'));
    if (!event.target.classList.contains('calendar-day_inactive')) {
      event.target.classList.add('calendar-day_selected');
    }
  });
})();

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

clearButton.addEventListener('click', () => {
  // Remove calendar-day_selected class
  days.childNodes.forEach((day) => day.classList.remove('calendar-day_selected'));
});
