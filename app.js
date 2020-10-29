const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// *** set const
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
// console.log(items);

// *** set date 
// *** Note: the timer always start 10 days more than the date when user open this web page.
// *** get the current time
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// *** set futureDate to 10 days later
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 8, 00, 0);

// *** set futureDate to a specific date and time
// const futureDate = new Date(2020, 10, 29, 8, 00, 0);
// console.log(futureDate);

// *** getDay() return a zero based number, use it to access the corresponded day in 'weekdays' array
const day = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
// *** getMonth() return a zero based number, use it to access the corresponded month in 'months' array
const month = months[futureDate.getMonth()];
const year = futureDate.getFullYear();
const hour = format(futureDate.getHours());
const minute = format(futureDate.getMinutes());

giveaway.innerHTML = `giveaway ends on ${day}, ${date} ${month} ${year} ${hour}:${minute}am`;


// *** values in ms
const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;

// *** when a number is less than 10, add a 0 in front of it
function format(item){
  if(item < 10){
    return item = `0${item}`;
  } else {
    return item;
  }
}

// *** future time in ms
  const futureTimeMs = futureDate.getTime();

// *** display countdown timer on screen
function getReminingTime(){
  const currentTimeMs = new Date().getTime();
  const timeDifference = futureTimeMs - currentTimeMs;
  // console.log(timeDifference);

  let days = Math.floor(timeDifference / oneDay);
  let hours = Math.floor((timeDifference % oneDay) / oneHour);
  let minutes = Math.floor((timeDifference % oneHour) / oneMinute);
  let seconds = Math.floor((timeDifference % oneMinute) / 1000);

  // *** set values array
  let values = [days, hours, minutes, seconds];
  // console.log(values);
  
  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  // *** when the countdown has expried
  if(timeDifference < 0){
    clearInterval(updateCountdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired.</h4>`;
  }
}

// *** update countdown timer every second
const updateCountdown = setInterval(getReminingTime, 1000);

getReminingTime();