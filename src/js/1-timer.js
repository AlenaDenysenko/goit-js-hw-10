
import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('startButton');

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future'
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
  const endDate = new Date(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const timeLeft = endDate - currentDate;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    updateTimeDisplay(0);
    return;
  }

  startButton.disabled = true;
  updateTimeDisplay(timeLeft);

  timerInterval = setInterval(() => {
    const newEndDate = new Date(dateTimePicker.value).getTime();
    const newTimeLeft = newEndDate - new Date().getTime();

    if (newTimeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimeDisplay(0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!'
      });
      startButton.disabled = false;
      return;
    }

    updateTimeDisplay(newTimeLeft);
  }, 1000);
});

function updateTimeDisplay(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
