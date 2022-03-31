const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');


const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
  todos.forEach(todo => addTodo(todo));
};

form.addEventListener('submit', event => {
  event.preventDefault();
  addTodo();
});


function addTodo(todo) {
  let todoText = input.value;

  if(todo) {
    todoText = todo.text;
  };

  if(todoText) {
    const todoEl = document.createElement('li');
    if(todo && todo.completed) {
      todoEl.classList.add('completed');
    };

    todoEl.innerText = todoText;
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLocalStorage();
    });

    todoEl.addEventListener('contextmenu', event => {
      event.preventDefault();
      todoEl.remove();
      updateLocalStorage();
    });

    todosUL.appendChild(todoEl);
    input.value = '';

    updateLocalStorage();
  };
};

function updateLocalStorage() {
  const todos = [];
  const todosEl = document.querySelectorAll('li');

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
};