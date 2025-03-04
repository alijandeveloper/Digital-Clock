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

 // 12-hour format
 if (!is24HourFormat) {
    if (hours >= 12) {
        ampm = "PM";
        if (hours > 12) hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
} else {
    ampm = "";
}
// Format Time
hoursEl.textContent = hours.toString().padStart(2, "0");
minutesEl.textContent = minutes.toString().padStart(2, "0");
secondsEl.textContent = seconds.toString().padStart(2, "0");
ampmEl.textContent = ampm;

// Update Date
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
dateEl.textContent = now.toLocaleDateString("en-US", options);
}

// Toggle 12/24 Hour Format
toggleFormatBtn.addEventListener("click", () => {
is24HourFormat = !is24HourFormat;
updateClock();
});

// Dark Mode Toggle
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load Dark Mode Setting
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// Background Picker
bgPicker.addEventListener("input", (event) => {
    document.body.style.backgroundColor = event.target.value;
    localStorage.setItem("bgColor", event.target.value);
});

// Load Saved Background Color
if (localStorage.getItem("bgColor")) {
    document.body.style.backgroundColor = localStorage.getItem("bgColor");
}

// Run Clock Every Second
setInterval(updateClock, 1000);
updateClock();