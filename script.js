let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let intervalId;

const timeDisplay = document.getElementById("time");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

// Format time in hh:mm:ss
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

// Start or stop the stopwatch
function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
    startStopBtn.textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
    startStopBtn.textContent = "Stop";
  }
  isRunning = !isRunning;
}

// Update the displayed time
function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime / 1000);
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapTimes = [];
  lapList.innerHTML = "";
}

// Record a lap time
function recordLap() {
  if (isRunning) {
    lapTimes.push(formatTime(elapsedTime / 1000));
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapTimes.length}: ${
      lapTimes[lapTimes.length - 1]
    }`;
    lapList.appendChild(lapItem);
  }
}

// Event listeners for buttons
startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
