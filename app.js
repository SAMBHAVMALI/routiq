const input = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// 🔧 migrate old data if needed
habits = habits.map(h =>
  typeof h === "string"
    ? { name: h, done: false }
    : h
);


function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function closeAllMenus() {
  document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
}

document.addEventListener("click", closeAllMenus);

function render() {
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit";

    const text = document.createElement("span");
    text.textContent = habit.name;

    const flip = document.createElement("div");
    flip.className = "flip" + (habit.done ? " done" : "");
    flip.innerHTML = `
      <div class="flip-inner">
        <div class="flip-face flip-front">✖</div>
        <div class="flip-face flip-back">✔</div>
      </div>
    `;

    flip.addEventListener("click", (e) => {
      e.stopPropagation();
      flip.classList.toggle("done");
      habits[index].done = !habits[index].done;
      save();
    });

    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.textContent = "⋮";

    const menu = document.createElement("div");
    menu.className = "menu";
    menu.innerHTML = `
      <button>Edit</button>
      <button>Delete</button>
    `;

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllMenus();
      menu.style.display = "block";
    });

    menu.children[0].addEventListener("click", () => {
      const newName = prompt("Edit habit:", habit.name);
      if (newName) {
        habits[index].name = newName.trim();
        save();
        render();
      }
    });

    menu.children[1].addEventListener("click", () => {
      if (confirm("Delete this habit?")) {
        habits.splice(index, 1);
        save();
        render();
      }
    });

    li.appendChild(text);
    li.appendChild(flip);
    li.appendChild(menuBtn);
    li.appendChild(menu);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;
  habits.push({ name: value, done: false });
  input.value = "";
  save();
  render();
});

render();

/* Service Worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
