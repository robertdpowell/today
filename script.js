const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));
const clear = document.getElementById("clear");

//if there are todos in local storage, get them and for each one, perform 'addTodo'
if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

//once all todos are loaded, listen for new ones
form.addEventListener("submit", (e) => {
  //what is e?
  e.preventDefault(); //what is this?
  addTodo();
});

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function addTodo(todo) {
  let todoText = input.value;

  //if we are performing function with an input of a todo, we use the todo text already present in ls
  //as there is no input to capture
  if (todo) {
    todoText = todo.text;
  }

  //all scenarios go through this route.
  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    //todoEl.addEventListener("touchmove", (e) => {
    //e.preventDefault();
    //todoEl.remove();
    //updateLS();
    //});

    todosUL.appendChild(todoEl); //add todos to end of list
    input.value = ""; //reset input box to blank
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
