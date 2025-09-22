import React, { createContext, useContext, useState, ReactNode} from "react";
import { Todo } from "../types/Todo";

type TodosContextType = {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleStatus: (id: number) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({children}: {children: ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // 할 일 추가 함수
    const addTodo = (text: string) => {
        if(!text.trim()) return; 
        const newTodo: Todo = {
            id: Date.now(),
            text,
            status: "todo"
        };
        setTodos(prev => [...prev, newTodo]);
    }

    // 할 일 업데이트 함수
    const toggleStatus = (id: number) => {
        const selectedItem = todos.find(todo => todo.id === id);
        if (!selectedItem) return;

        // Case 1: 완료 버튼 클릭 시
        if (selectedItem.status === "todo") {
            // "todo" => "done"으로 상태 변경
            setTodos(prev => 
                prev.map(todo => 
                    todo.id === id ? {...todo, status: "done"} : todo
                )
            )
        }
        // Case 2: 취소 버튼 클릭 시
        if (selectedItem.status === "done") {
            // todos 리스트에서 해당 아이템 삭제
            setTodos(prev => prev.filter(todo => todo.id !== id));
        }
    }

    return (
        <TodosContext.Provider value={{todos, addTodo, toggleStatus}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    const context = useContext(TodosContext);
    if (!context) throw new Error(
        'useTodos는 반드시 TodosProvider 내부에서 사용되어야 합니다.'
    )
    return context;
}