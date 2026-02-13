// Timer functionality for the clock app
document.addEventListener("DOMContentLoaded", () => {
let timerInterval, remaining;

document.getElementById("timerStart").onclick = () => {
    const mins = Number(document.getElementById("timerMinutes").value);
    remaining = mins * 60;

    timerInterval = setInterval(() => {
     if (remaining <= 0) {
        clearInterval(timerInterval);
        alert("Time is Up!");
        return;
     }
     remaining--;
     const m = Math.floor(remaining / 60);
     const s = remaining % 60;
     document.getElementById("timerDisplay").textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }, 1000);
};

document.getElementById("timerReset").onclick = () => {
    clearInterval(timerInterval);
    document.getElementById("timerDisplay").textContent = "00:00";
};
});

// Stopwatch functionality for the clock app
document.addEventListener("DOMContentLoaded", () => {
let swStartTime, swElapsed = 0, swInterval;

function updateStopwatch() {
    swElapsed = Date.now() - swStartTime;
    const ms = swElapsed % 1000;
    const sec = Math.floor((swElapsed / 1000) % 60);
    const min = Math.floor(swElapsed / 60000);
    document.getElementById("swTime").textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

document.getElementById("swStart").onclick = () => {
    swStartTime = Date.now() - swElapsed;
    swInterval = setInterval(updateStopwatch, 10);
};

document.getElementById("swPause").onclick = () => {
    clearInterval(swInterval);
};

document.getElementById("swReset").onclick = () => {
    clearInterval(swInterval);
    swElapsed = 0;
    document.getElementById("swTime").textContent = "00:00:00.000";
};
});