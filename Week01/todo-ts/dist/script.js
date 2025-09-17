"use strict";
const todoInput = document.getElementById("todoInput");
const todoForm = document.getElementById("todoForm");
const todolist = document.getElementById("todoitem");
const donelist = document.getElementById("donelist");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
  todolist.innerHTML = "";
  donelist.innerHTML = "";
  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todolist.appendChild(li);
  });
  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    donelist.appendChild(li);
  });
};
const getTodoText = () => {
  return todoInput.value.trim();
};
const addTodo = (text) => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};
[
  { id: 1, text: "할 일 1" },
  { id: 2, text: "할 일 2" },
];
const completeTodo = (todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};
const deleteTodo = (todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};
const createTodoElement = (todo, isDone) => {
  const li = document.createElement("li");
  li.classList.add("todoItemRow");
  li.textContent = todo.text;
  const button = document.createElement("button");
  button.classList.add("plusButton");
  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "rgb(215, 89, 95)";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "rgb(102, 215, 89)";
  }
  button.addEventListener("click", () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });
  li.appendChild(button);
  return li;
};
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});
renderTasks();
