document.addEventListener("DOMContentLoaded", () => {
let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function renderAlarms() {
    const List = document.getElementById("alarmList");
    List.innerHTML = "";

    alarms.forEach((time, index) => {
        const li = document.createElement("li");
        li.textContent = time;
        li.onclick = () => {
            alarms.splice(index, 1);
            localStorage.setItem("alarms", JSON.stringify(alarms));
            renderAlarms();
        };
        List.appendChild(li);
    });
}

function snoozeAlarm() {
    stopAlarm();
    const snoozeTime = new Date(Date.now() + 5 * 60000);
    alarms.push(snoozeTime.toTimeString().slice(0, 5));
}

document.getElementById("setAlarm").onclick = () => {
    const time = document.getElementById("alarmTime").value;
    if (time) {
        alarms.push(time);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
    }
};

setInterval(() => {
    const now = new Date();
    const current = now.toTimeString().slice(0, 5);
    if (alarms.includes(current)) {
        alert("Alarm!");
        alarms = alarms.filter(a => a !== current);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
    }
}, 1000);

document.getElementById("stopAlarm").onclick = () => {
    alarms = [];
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

renderAlarms();
});