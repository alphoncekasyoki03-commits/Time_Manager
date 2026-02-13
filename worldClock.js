// Digital clock functionality for the clock app
function updateClock() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
    document.getElementById("date").textContent = now.toLocaleDateString();
}
setInterval(updateClock, 1000);
updateClock();

// Analog clock functionality for the clock app
let currentTimeZone = "Africa/Nairobi"; // Default time zone

const timeZoneSelect = document.getElementById("city");

timeZoneSelect.addEventListener("change", (e) => {
    currentTimeZone = e.target.value;
});

function getTimeInZone(zone) {
    const now = new Date();
    const options = {
       timeZone: zone,
       hour: "numeric",
       minute: "numeric",
       second: "numeric",
       hour12: false };

    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
    const get = type => parts.find(p => p.type === type).value;

    return {
       hours: parseInt(get("hour")),
       minutes: parseInt(get("minute")),
       seconds: parseInt(get("second"))
    };
}

function updateAnalogClock() {
    const { hours, minutes, seconds } = getTimeInZone(currentTimeZone);

    const secondDeg = seconds * 6; // 360 degrees / 60 seconds
    const minuteDeg = minutes * 6 + seconds * 0.1; // 360 degrees / 60 minutes + seconds contribution
    const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360 degrees / 12 hours + minutes contribution

    document.getElementById("secondHand").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    document.getElementById("minuteHand").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.getElementById("hourHand").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

requestAnimationFrame(function tick() {
    setInterval(updateAnalogClock, 1000);
    updateAnalogClock();
    requestAnimationFrame(tick);
});

function placeClockNumbers() {
    const clock = document.getElementById("analogClock");
    const numbers = clock.querySelectorAll(".numbers span");

    const radius = clock.offsetWidth / 2 - 25; // Adjust for padding
    const center = clock.offsetWidth / 2;

    numbers.forEach(num => {
        const n = Number(num.dataset.n);
        const angle = (n - 3) * (Math.PI / 6); // Start at 12 o'clock position

        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        num.style.left = `${x}px`;
        num.style.top = `${y}px`;
    });
}

placeClockNumbers();
window.addEventListener("resize", placeClockNumbers);

// World clock functionality for the clock app
document.addEventListener("DOMContentLoaded", () => {
function updateWorldClock() {
    const zone = document.getElementById("city").value;
    const time = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeStyle: "medium", dateStyle: "medium" }).format(new Date());

    document.getElementById("worldTime").textContent = time;
}

setInterval(updateWorldClock, 1000);
document.getElementById("city").onchange = updateWorldClock;
});