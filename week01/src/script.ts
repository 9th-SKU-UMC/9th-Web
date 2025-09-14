// DOM 요소 가져오기
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.getElementById('todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const doneList = document.getElementById('done-list') as HTMLUListElement

// todo 저장하기 -> 숫자 id, 문자 text -> 배열로 관리
type Todo = {
    id: number;
    text: string;
};

// 할 일, 완료 목록 배열에 저장
let todos: Todo[] = [];
let done: Todo[] = [];

const renderTasks = (): void => {
    todoList.innerHTML = ''; // 리스트 비움
    doneList.innerHTML = '';

    todos.forEach((todo): void => {
        const li = CreateTodoElement(todo, false);
        todoList.appendChild(li);
    })

    done.forEach((todo): void => {
        const li = CreateTodoElement(todo, true);
        doneList.appendChild(li);
    })
};

const getTodoText = (): string => {
    return todoInput.value.trim(); // 공백제거
}

// 할 일 추가
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text}); // 고유한 값의 id를 나타내기 위해서 Date.now() 사용
    todoInput.value = '';
    renderTasks();
}

const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id != todo.id);
    done.push(todo);
    renderTasks();
}

const deleteTodo = (todo: Todo): void => {
    done = done.filter((t): boolean => t.id != todo.id);
    renderTasks();
}

// li 생성, 버튼 생성, 안에 들어갈 text 집어 넣기
const CreateTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
}

todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault(); // 안 쓰면 새로고침 돼서 사라짐
    const text = getTodoText();
    if (text) { // text가 적혀있을 때만 추가
        addTodo(text);
    }
})

renderTasks();