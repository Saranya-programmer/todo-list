
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("taskCount");

// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add with Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Render tasks
function renderTasks(filteredTasks = tasks) {
  list.innerHTML = "";

  filteredTasks.forEach((task) => {
    const realIndex = tasks.indexOf(task);

    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      tasks[realIndex].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Text
    const span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    // Button group
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        tasks[realIndex].text = newText;
        saveTasks();
        renderTasks();
      }
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", function () {
      tasks.splice(realIndex, 1);
      saveTasks();
      renderTasks();
    });

    // Append buttons
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    // Append all
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnGroup);

    list.appendChild(li);
  });

  updateCount();
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
addBtn.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();

  input.value = "";
});

// Filter tasks
function filterTasks(type) {
  if (type === "all") {
    renderTasks(tasks);
  } else if (type === "completed") {
    renderTasks(tasks.filter(t => t.completed));
  } else {
    renderTasks(tasks.filter(t => !t.completed));
  }
}

// Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  renderTasks();
}

// Update counter
function updateCount() {
  const completed = tasks.filter(t => t.completed).length;
  count.innerText = `Total: ${tasks.length} | Completed: ${completed}`;
}

// Initial render
renderTasks();







/*
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  // 1. Get input value
  const taskText = input.value;

  // 2. Prevent empty task
  if (taskText === "") return;

  // 3. Create new list item
  const li = document.createElement("li");

  // 4. Add text to li
  li.innerText = taskText;

  // 5. Add li to list
  list.appendChild(li);

  // 6. Clear input box
  input.value = "";
});


*/



/*

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  const taskText = input.value;

  if (taskText === "") return;

  // Create li
  const li = document.createElement("li");

  // Create span for text
  const span = document.createElement("span");
  span.innerText = taskText;

  // Mark complete (click on text)
  span.addEventListener("click", function () {
    span.style.textDecoration = "line-through";
  });

  // Create delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";

  // Delete task
  delBtn.addEventListener("click", function () {
    li.remove();
  });

  // Add span and button to li
  li.appendChild(span);
  li.appendChild(delBtn);

  // Add li to list
  list.appendChild(li);

  input.value = "";
});




*/

