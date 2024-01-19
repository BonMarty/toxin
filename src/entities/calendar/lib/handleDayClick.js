// Function that handle user click on day
export default function handleDayClick(options) {
  let {
    days,
    currentMonth,
    currentYear,
    currentDayPick,
    maxDaysPick,
    selectedDays,
    dropdownHeaderTitle,
  } = options;

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
          const selectedDay = event.target;

          // Add this day to selectedDays array
          selectedDays.push(selectedDay);

          // If user select one day it will show this day in dropdownHeaderTitle
          // Example -> 1.1.1111
          if (selectedDays.length === 1) {
            dropdownHeaderTitle.childNodes[0].data = `${selectedDays[0].childNodes[0].data}.${
              currentMonth + 1
            }.${currentYear}`;
          }

          // If user select two days it will show days period
          // Example -> 1 Jan - 2 Jan
          if (selectedDays.length === 2) {
            // Sort selectedDays array
            selectedDays.sort(
              (firstDay, secondDay) =>
                Number(firstDay.childNodes[0].data) - Number(secondDay.childNodes[0].data),
            );

            selectedDays[0].classList.add('calendar-day_first-in-selected');
            selectedDays[1].classList.add('calendar-day_last-in-selected');

            days.childNodes.forEach((day) => {
              const isInactiveDay = day.classList.contains('calendar-day_inactive') ? true : false;

              const isDayGreaterThanFirstSelectedDay =
                Number(day.innerHTML) > selectedDays[0].childNodes[0].data ? true : false;
              const isDayLessThanSecondSelectedDay =
                Number(day.innerHTML) < selectedDays[1].childNodes[0].data ? true : false;

              if (
                isDayGreaterThanFirstSelectedDay &&
                isDayLessThanSecondSelectedDay &&
                !isInactiveDay
              ) {
                day.classList.add('calendar-day_in-range');
              }
            });
            import('./months').then((module) => {
              console.log(module.months);
              dropdownHeaderTitle.childNodes[0].data = `${
                selectedDays[0].childNodes[0].data
              } ${module.months[currentMonth].slice(0, 3)} - ${
                selectedDays[1].childNodes[0].data
              } ${module.months[currentMonth].slice(0, 3)}`;
            });
          }
        }
      });
    });
  }
}
