import styled from "styled-components";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
};

export default function TodoInput({ value, onChange, onAdd }: Props) {
  return (
    <Div>
      <Input
        type="text"
        placeholder="Enter a task"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button className="plusButton" onClick={onAdd}>
        Add Task
      </Button>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 35px;
  width: 300px;
  padding: 10px;
  margin-right: 10px;
  border-color: #e8e8e8;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: rgb(89, 159, 215);
  color: white;
  border: 0px;
  cursor: pointer;
`;
