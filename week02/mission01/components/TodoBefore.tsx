import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ITodo } from '../src/types/todo'

const TodoBefore = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<ITodo[]>([]);
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            const newTodo: ITodo = {id: Date.now(), text};
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInput('');
        }
    }

    const completeTodo = (todo: ITodo) => {
        setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo])
    }

    const deleteTodo = (todo: ITodo) => {
        setDoneTodos((prevDoneTodo): ITodo[] =>
            prevDoneTodo.filter((t) => t.id !== todo.id)
        )
    }

    return (
        <div className='todo-container'>
            <div className='todo-container__header'>
                <h1>NAYUN TODO</h1>
            </div>

            <form id='todo-form' className='todo-container__form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='todo-container__input'
                    placeholder='할 일을 입력하세요'
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></input>

                <button type='submit' className='todo-container__button'>할 일 추가</button>
            </form>

            <div className='render-container'>
                <div className='render-container__section'>
                    <h2 className='render-container__title'>할 일</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {todos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button
                                    style={{ backgroundColor: '#28a745' }}
                                    className="render-container__item-button"
                                    onClick={() => completeTodo(todo)}>완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='render-container__section'>
                    <h2 className='render-container__title'>완료</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button
                                    style={{ backgroundColor: '#dc3545' }}
                                    className="render-container__item-button"
                                    onClick={() => deleteTodo(todo)}>삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default TodoBefore;