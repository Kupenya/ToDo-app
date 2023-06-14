// Get DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

// Store TODO items
let todos = [];

// Function to render TODO items
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const completedClass = todo.completed ? "completed" : "";
    li.innerHTML = `
    <span class="todo-number">${index + 1}.</span>
      <span class="todo-text ${completedClass}" data-index="${index}">${
      todo.title
    }</span>
      <div class="todo-actions">
        <button class="edit-btn">Edit</button>
        <span class="todo-delete">X</span>
      </div>
      <input type="checkbox" class="todo-checkbox" data-index="${index}" ${
      todo.completed ? "checked" : ""
    }>
    `;
    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    todos.push({ title: todoText, completed: false });
    renderTodos();
    todoInput.value = "";
  }
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Function to toggle todo completion
function toggleTodoComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Function to edit a todo
function editTodo(element, index) {
  const textElement = element.querySelector(".todo-text");
  const todoText = textElement.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = todoText;
  input.classList.add("edit-input");
  textElement.replaceWith(input);
  input.focus();
  input.addEventListener("blur", () => {
    const newTitle = input.value.trim();
    if (newTitle !== "") {
      todos[index].title = newTitle;
      renderTodos();
    }
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      input.blur();
    }
  });
}

// Function to clear completed todos
function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

// Function to filter todos
function filterTodos(filter) {
  const activeBtn = document.querySelector(".filter-btn.active");
  if (activeBtn) {
    activeBtn.classList.remove("active");
  }

  const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  btn.classList.add("active");

  switch (filter) {
    case "active":
      renderFilteredTodos(false);
      break;
    case "completed":
      renderFilteredTodos(true);
      break;
    default:
      renderTodos();
      break;
  }
}

// Function to render filtered todos
function renderFilteredTodos(completed) {
  const filteredTodos = todos.filter((todo) => todo.completed === completed);
  todoList.innerHTML = "";

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    const completedClass = todo.completed ? "completed" : "";
    li.innerHTML = `
    <span class="todo-number">${index + 1}.</span>
      <span class="todo-text ${completedClass}" data-index="${index}">${
      todo.title
    }</span>
      <div class="todo-actions">
        <button class="edit-btn">Edit</button>
        <span class="todo-delete">X</span>
      </div>
      <input type="checkbox" class="todo-checkbox" data-index="${index}" ${
      todo.completed ? "checked" : ""
    }>
    `;
    todoList.appendChild(li);
  });
}

// Event listeners
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("todo-delete")) {
    const li = event.target.parentElement.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    deleteTodo(index);
  }

  if (event.target.classList.contains("todo-checkbox")) {
    const index = event.target.dataset.index;
    toggleTodoComplete(index);
  }

  if (event.target.classList.contains("edit-btn")) {
    const li = event.target.parentElement.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    editTodo(li, index);
  }
});

clearBtn.addEventListener("click", function () {
  clearCompletedTodos();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const filter = btn.dataset.filter;
    filterTodos(filter);
  });
});

// Initial rendering
renderTodos();
