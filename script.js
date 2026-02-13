document.addEventListener("DOMContentLoaded", () => {
const tabs = document.querySelectorAll(".tabs button");
const sections = document.querySelectorAll(".tab");

tabs.forEach(btn => {
    btn.onclick = () => {
        tabs.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));

        btn.classList.add("active");

document.getElementById(btn.dataset.tab).classList.add("active");
    };
});

document.getElementById("dateWindow").textContent = new Date().getDate();

document.body.dataset.face = "sport";
});