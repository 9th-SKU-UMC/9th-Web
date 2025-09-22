"use strict";
const input = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const addTaskButton = document.getElementById("add-button");
function addTodo(text) {
    const li = document.createElement("li");
    li.className = 'list-item-container';
    li.innerHTML = `
        <span class="list-item-container__title">${text}</span>
        <button class="list-item-container__button--complete">완료</button>
    `;
    return li;
}
input === null || input === void 0 ? void 0 : input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !input || !todoList)
        return;
    const text = input.value.trim();
    if (!text)
        return;
    todoList.appendChild(addTodo(text));
    input.value = "";
});
addTaskButton === null || addTaskButton === void 0 ? void 0 : addTaskButton.addEventListener("click", () => {
    if (!input || !todoList)
        return;
    const text = input.value.trim();
    if (!text)
        return;
    todoList.appendChild(addTodo(text));
    input.value = "";
});
document.addEventListener("click", (event) => {
    const targetElement = event.target;
    if (!targetElement)
        return;
    const button = targetElement.closest("button");
    if (!button)
        return;
    const listItem = button.closest("li");
    if (!listItem)
        return;
    if (button.classList.contains("list-item-container__button--complete")) {
        button.textContent = "삭제";
        button.classList.remove("list-item-container__button--complete");
        button.classList.add("list-item-container__button--delete");
        if (doneList)
            doneList.appendChild(listItem);
        return;
    }
    if (button.classList.contains("list-item-container__button--delete")) {
        listItem.remove();
        return;
    }
});
