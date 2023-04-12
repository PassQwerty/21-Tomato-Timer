// Pressing ctrl + alt + L
let currentTime = null;
let currentTimeLast = null;
let timerId = null;

let intSwitch = 0;
let workingTime = 25;
let littleBreakTime = 5;
let bigBreakTime = 60;

let timer = document.querySelector("#timer");

let btnStart = document.querySelector(".btnStart");
let btnStop = document.querySelector(".btnStop");
let btnRestart = document.querySelector(".btnReset");

let btnAccept = document.querySelector("#accept");
let btnReset = document.querySelector("#reset");
let btnStandard = document.querySelector("#standard");

let inputTime = document.querySelector("#input-time");
let inputLittleTime = document.querySelector("#input-little-time");
let inputBigTime = document.querySelector("#input-big-time");

function clearInputsHandler(list) {
  list.forEach((item) => item.value && (item.value = ""));
}

const setInputValueHandler = (list) => {
  list.map(({ input, value }) => {
    input.value = value;
  });
};

const areInputsValid = (inputs) => {
  return inputs.every((input) => Number.isInteger(parseFloat(input)));
};

btnReset.addEventListener("click", () => {
  clearInputsHandler([inputTime, inputLittleTime, inputBigTime]);
});

btnStandard.addEventListener("click", () => {
  setInputValueHandler([
    { input: inputTime, value: 25 },
    { input: inputLittleTime, value: 5 },
    { input: inputBigTime, value: 30 },
  ]);
});

btnAccept.addEventListener("click", () => {
  let result = areInputsValid([
    inputTime.value,
    inputLittleTime.value,
    inputBigTime.value,
  ]);
  if (result !== true) return;

  workingTime = inputTime.value;
  littleBreakTime = inputLittleTime.value;
  bigBreakTime = inputBigTime.value;
  clearInputsHandler([inputTime, inputLittleTime, inputBigTime]);
});

btnStart.addEventListener("click", () => {
  if (currentTime === null) {
    currentTime = workingTime * 60;
    timerId = setInterval(() => updateTimer(currentTime), 1000);
  } else {
    if (currentTime === currentTimeLast) return;

    currentTimeLast = currentTime;
    clearInterval(timerId);
    timerId = setInterval(() => updateTimer(currentTime), 1000);
  }
});

const clearTimer = () => {
  timer.innerText = getCurrentTime(workingTime * 60);
  clearInterval(timerId);
  timerId = null;
  currentTime = null;
};

const getCurrentTime = (int) => {
  let minutes = Math.floor(int / 60);
  let seconds = int % 60;

  return (displayString = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`);
};

function updateTimer(time) {
  if (currentTime === 0) {
    clearTimer();
    timer.innerText = "00:00";
    if (intSwitch === 0) {
      currentTime = littleBreakTime * 60;
      timerId = setInterval(() => updateTimer(currentTime), 1000);
      intSwitch++;
      return;
    } else if (intSwitch === 1) {
      currentTime = bigBreakTime * 60;
      timerId = setInterval(() => updateTimer(currentTime), 1000);
      intSwitch++;
      return;
    } else {
      return;
    }
  }

  timer.innerText = getCurrentTime(time);
  currentTime--;
}

btnStop.addEventListener("click", () => {
  if (timerId === null) return;

  clearInterval(timerId);
});

btnRestart.addEventListener("click", () => {
  intSwitch = 0;
  clearTimer();
});
