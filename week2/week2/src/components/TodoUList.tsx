import React from 'react'
import '../styles/mission1.css'
import { Todo } from '../types/Todo'
import { useTodos } from '../context/TodosContext'
import { THEME } from '../types/Theme'
import { useTheme } from '../context/ThemeContext'
import clsx from 'clsx'

type todoUListProps = {
    todo: Todo,
}

const TodoUList = ({todo}: todoUListProps) => {
    const { toggleStatus } = useTodos();
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;
    const styleByStatus = todo.status === "todo" ? "render-container__item-button--todo" : "render-container__item-button--done";

    return (
        <>
        <li key={todo.id} className={clsx("render-container__item", {
            'render-container__item--light': isLightMode,
            'render-container__item--dark': !isLightMode
        })}>
            <span className="render-container__item-text">{todo.text}</span>
            <button 
                className={`render-container__item-button ${styleByStatus}`} 
                onClick={() => toggleStatus(todo.id)}
            >
                {todo.status === "todo" ? "완료" : "취소"}
            </button>
        </li>
        </>
    )
}

export default TodoUList;