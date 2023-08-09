import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.start.addEventListener('click', onStartClick);

let startBtn = refs.start.disabled = true;

let intervalTimer = null;
let targetDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            refs.start.disabled = true;
            Notify.failure('Please choose a date in the future');
        } else { 
            targetDate = selectedDate;
            refs.start.disabled = false;
        }
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function onStartClick() {
    startBtn =refs.start.disabled = true;
    intervalTimer = setInterval(updateTimer, 1000)
}
 
function updateTimer() {
    const countdown = targetDate - new Date();
    
    if (countdown <= 0) {
        clearInterval(intervalTimer)
        renderTimer(convertMs(0));
        startBtn = refs.start.disabled = false;
        Notify.success('It worked 🥳')
        return;
    }

    const time = convertMs(countdown);
    renderTimer(time);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTimer(time) {
    refs.days.textContent = time.days;
    refs.hours.textContent = time.hours;
    refs.minutes.textContent = time.minutes;
    refs.seconds.textContent = time.seconds;
 }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}