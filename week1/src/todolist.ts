const input = document.getElementById("task-input") as HTMLInputElement | null;
const todoList = document.getElementById("todo-list") as HTMLUListElement | null;
const doneList = document.getElementById("done-list") as HTMLUListElement | null;
const addTaskButton = document.getElementById("add-button") as HTMLButtonElement | null;

// 새로운 할 일 등록
function addTodo(text: string): HTMLLIElement {
    const li = document.createElement("li");
    li.className = 'list-item-container';
    li.innerHTML = `
        <span class="list-item-container__title">${text}</span>
        <button class="list-item-container__button--complete">완료</button>
    `;

    return li;
}

// 할 일 추가 이벤트 (1) Enter 키 입력
input?.addEventListener("keydown", (event: KeyboardEvent) => {
    if(event.key !== "Enter" || !input || !todoList) return;

    const text = input.value.trim();
    if(!text) return;

    todoList.appendChild(addTodo(text));
    input.value = "";
})

// 할 일 추가 이벤트 (2) 할 일 추가 버튼 클릭
addTaskButton?.addEventListener("click", () => {
    if(!input || !todoList) return;

    const text = input.value.trim();
    if(!text) return;

    todoList.appendChild(addTodo(text));
    input.value = "";
})

// 할 일 완료 / 삭제 이벤트
document.addEventListener("click", (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement | null;
    if(!targetElement) return;

    const button = targetElement.closest("button") as HTMLButtonElement | null;
    if(!button) return;

    const listItem = button.closest("li") as HTMLLIElement | null;
    if(!listItem) return;

    if(button.classList.contains("list-item-container__button--complete")) {
        // 완료 -> 삭제 버튼으로 전환
        button.textContent = "삭제";
        button.classList.remove("list-item-container__button--complete");
        button.classList.add("list-item-container__button--delete");
        if (doneList) doneList.appendChild(listItem);
        return;
    }

    if(button.classList.contains("list-item-container__button--delete")) {
        // 삭제
        listItem.remove();
        return;
    }
})