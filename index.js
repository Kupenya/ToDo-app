// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Store TODO items
let todos = [];

// Function to render TODO items
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    const completedClass = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span class="todo-text ${completedClass}">${todo.title}</span>
      <span class="todo-delete">X</span>
      <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
    `;
    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    todos.push({ title: todoText, completed: false });
    renderTodos();
    todoInput.value = '';
  }
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Event listeners
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', function(event) {
  if (event.target.classList.contains('todo-delete')) {
    const li = event.target.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    deleteTodo(index);
  }
  if (event.target.classList.contains('todo-checkbox')) {
    const index = event.target.dataset.index;
    todos[index].completed = event.target.checked;
    renderTodos();
  }
});

// Initial rendering
renderTodos();
