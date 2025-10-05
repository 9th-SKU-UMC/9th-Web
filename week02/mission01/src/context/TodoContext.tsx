import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { ITodo } from "../types/todo";

interface ITodoContext {
  todos: ITodo[];
  doneTodos: ITodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: ITodo = { id: Date.now(), text };
    setTodos((prevTodos): ITodo[] => [...prevTodos, newTodo]);
  };

  const completeTodo = (todo: ITodo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: ITodo) => {
    setDoneTodos((prevDoneTodo): ITodo[] =>
      prevDoneTodo.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."
    );
  }
  return context;
};
