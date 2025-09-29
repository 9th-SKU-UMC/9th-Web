import styled from "styled-components";
import { Todo } from "../type/todo";

type Props = {
  todos: Todo[];
  doneTasks: Todo[];
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export default function ListContainer({
  todos,
  doneTasks,
  onComplete,
  onDelete,
}: Props) {
  return (
    <Div>
      <Section>
        <H2>To Do</H2>
        <List>
          {todos.map((todo) => (
            <Row key={todo.id}>
              <Text>{todo.text}</Text>
              <ActionButton variant="done" onClick={() => onComplete(todo)}>
                Done
              </ActionButton>
            </Row>
          ))}
        </List>
      </Section>

      <Section>
        <H2>Completed</H2>
        <List>
          {doneTasks.map((todo) => (
            <Row key={todo.id}>
              <Text>{todo.text}</Text>
              <ActionButton variant="delete" onClick={() => onDelete(todo)}>
                Delete
              </ActionButton>
            </Row>
          ))}
        </List>
      </Section>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const Section = styled.div`
  width: 300px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 10px;
  min-height: 100px;
`;

const H2 = styled.h2`
  border: 1px solid #ffffff;
  color: rgb(89, 159, 215);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
`;

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px 20px 20px 0px;
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.div`
  flex: 1;
  min-width: 0;
  margin: 10px;
  white-space: normal;
  word-break: break-word;
`;

const ActionButton = styled.button<{ variant: "done" | "delete" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ variant }) =>
    variant === "done" ? "rgb(102, 215, 89)" : "rgb(215, 89, 95)"};
  padding: 10px 12px;
  margin: 5px;
  border-radius: 10px;
  color: #fff;
  border: 0;
  cursor: pointer;

  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1;
`;
