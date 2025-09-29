import { createContext, useContext, useState, PropsWithChildren } from "react";
import { Todo } from "../type/todo";

interface ITodoContext {
  todos: Todo[];
  doneTasks: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: t }]);
  };

  const completeTodo = (todo: Todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTasks((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: Todo) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTasks, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}
