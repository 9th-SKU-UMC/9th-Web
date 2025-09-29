import { useState } from "react";
import styled from "styled-components";
import TodoInput from "./TodoInput";
import ListContainer from "./ListContainer";
import { useTodo } from "../context/TodoContext";

export default function Todolist() {
  const { todos, doneTasks, addTodo, completeTodo, deleteTodo } = useTodo();
  const [input, setInput] = useState("");

  return (
    <TodolistContainer>
      <H1>TODOLIST</H1>
      <TodoInput
        value={input}
        onChange={setInput}
        onAdd={() => {
          addTodo(input);
          setInput("");
        }}
      />
      <ListContainer
        todos={todos}
        doneTasks={doneTasks}
        onComplete={completeTodo}
        onDelete={deleteTodo}
      />
    </TodolistContainer>
  );
}

const TodolistContainer = styled.div`
  padding: 30px;
  border-radius: 10px;
`;

const H1 = styled.h1`
  color: rgb(89, 159, 215);
`;
