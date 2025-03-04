// Select Elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");
const toggleFormatBtn = document.getElementById("toggle-format");
const toggleThemeBtn = document.getElementById("toggle-theme");
const setCustomBtn = document.getElementById("set-custom");
const resetBtn = document.getElementById("reset");
const customTimeSection = document.getElementById("customTimeSection");
const customTimeInput = document.getElementById("customTime");
const customDateInput = document.getElementById("customDate");
const applyCustomBtn = document.getElementById("applyCustom");

let is24HourFormat = false;
let useLiveTime = true; // Default: Live time enabled

// Function to Update Time
function updateClock() {
    if (!useLiveTime) return;
    
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "AM";

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

    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
    ampmEl.textContent = ampm;

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

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// Custom Time & Date Functionality
setCustomBtn.addEventListener("click", () => {
    customTimeSection.style.display = "block";
    useLiveTime = false;
});

applyCustomBtn.addEventListener("click", () => {
    let customTime = customTimeInput.value.split(":"),
        customDate = new Date(customDateInput.value);
    
    if (customTime.length === 2) {
        let hours = parseInt(customTime[0]), minutes = parseInt(customTime[1]);
        let ampm = "AM";

        if (!is24HourFormat) {
            if (hours >= 12) {
                ampm = "PM";
                if (hours > 12) hours -= 12;
            } else if (hours === 0) {
                hours = 12;
            }
        }

        hoursEl.textContent = hours.toString().padStart(2, "0");
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = "00";
        ampmEl.textContent = ampm;
    }

    if (!isNaN(customDate.getTime())) {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        dateEl.textContent = customDate.toLocaleDateString("en-US", options);
    }
});

// Reset to Live Time
resetBtn.addEventListener("click", () => {
    useLiveTime = true;
    customTimeSection.style.display = "none";
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();