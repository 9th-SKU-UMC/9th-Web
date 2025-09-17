//HTML 요소 가져옴
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoForm = document.getElementById("todoForm") as HTMLFormElement;
const todolist = document.getElementById("todoitem") as HTMLUListElement;
const donelist = document.getElementById("donelist") as HTMLUListElement;

//투두의 타입 정의
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

//투두리스트 렌더링 하는 함수 정의
const renderTasks = (): void => {
  todolist.innerHTML = "";
  donelist.innerHTML = "";

  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);
    todolist.appendChild(li);
  });

  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    donelist.appendChild(li);
  });
};

//투두 텍스트 입력시 공백 제거 함수 정의
const getTodoText = (): string => {
  return todoInput.value.trim();
};

//투두 추가하는 함수 정의
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

todos = [
  { id: 1, text: "할 일 1" },
  { id: 2, text: "할 일 2" },
];
renderTasks();

//투두 상태 변경 (할 일-> 완료)
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

//완료 튜두 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);

  renderTasks();
};

//투두 아이템 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
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

  button.addEventListener("click", (): void => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;
};

//이벤트 버트너
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTasks();
