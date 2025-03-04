// Select Elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");
const toggleFormatBtn = document.getElementById("toggle-format");
const toggleThemeBtn = document.getElementById("toggle-theme");
const bgPicker = document.getElementById("bg-picker");

let is24HourFormat = false; // Default: 12-hour format
// Function to Update Time
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "AM";
