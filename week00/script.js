const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

todoInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        appendTodo();
        todoInput.value = "";
    }
})

function appendTodo() {
    const todoTask = todoInput.value.trim();
    if (todoTask == "")
        return;

    const li = document.createElement('li');
    li.classList.add('item');

    const span = document.createElement('span');
    span.textContent = todoTask;

    const btn = document.createElement('button');
    btn.classList.add('item-btn');
    btn.textContent = "완료";

    btn.addEventListener('click', () => {
        if (btn.textContent == "완료") {
            span.style.textDecoration = "line-through";
            doneList.appendChild(li);
            btn.textContent = "삭제";
        }
        else {
            span.style.textDecoration = "none";
            li.remove();
        }
    });

    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);
}

