const input = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  list.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${habit}</span>
      <button onclick="removeHabit(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

function addHabit() {
  const value = input.value.trim();
  if (!value) return;
  habits.push(value);
  input.value = "";
  save();
  render();
}

function removeHabit(index) {
  habits.splice(index, 1);
  save();
  render();
}

addBtn.addEventListener("click", addHabit);
render();

/* REGISTER SERVICE WORKER */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js", { scope: "./" })
      .then(() => console.log("SW registered"))
      .catch(err => console.error("SW error", err));
  });
}
