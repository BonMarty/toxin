// Function that renders current date in calendar-header
export default function renderCurrentDate(defaultOptions, handleDayClickOptions) {
  let { currentDate, currentMonth, currentYear, days, date } = defaultOptions;

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
    import('./months').then((module) => {
      currentDate.innerHTML = `${module.months[currentMonth]} ${currentYear}`;
    });
  }

  if (days) {
    // Set days
    days.innerHTML = dayLiTag;

    // Call handleDayClick function that handle user clicks on day
    import('./handleDayClick').then((module) => {
      module.default(handleDayClickOptions);
    });
  }
}
