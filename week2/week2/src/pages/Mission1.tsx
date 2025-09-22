import '../styles/mission1.css';
import TodoSection from '../components/TodoSection';
import { useTodos } from '../context/TodosContext';
import ToggleThemeButton from '../components/ToggleThemeButton';
import clsx from 'clsx';
import { THEME } from '../types/Theme';
import { useTheme } from '../context/ThemeContext';

const Mission1 = () => {
    const { todos, addTodo } = useTodos(); // id, text, status(todo/done)
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;
    const input = document.getElementById("todo-input") as HTMLInputElement;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const value = String(formData.get('todo') ?? '').trim();
        
        if (value) {
            addTodo(value);
            form.reset();
        }
    }


    return (
        <>
        <ToggleThemeButton />
        <div className={clsx("todo-container", {
            'todo-container--light': isLightMode,
            'todo-container--dark': !isLightMode
        })}>
            <h1 className="todo-container__header">MONI TODO</h1>
            <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo-input"
                    name = "todo"
                    className="todo-container__input"
                    placeholder="할 일 입력"
                    required
                />
                <button 
                    type="submit" 
                    onSubmit={() => addTodo(input.value.trim())}
                    className="todo-container__button">
                    할 일 추가
                </button>
            </form>
            <div className="render-container">
                <TodoSection listType="todo" todos={todos}/>
                <TodoSection listType="done" todos={todos}/>
            </div>
        </div>
        </>
    )
}

export default Mission1;