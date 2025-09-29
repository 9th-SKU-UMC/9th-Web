import styled from "styled-components";

export default function Home() {
  return (
    <Div>
      <h1>Home Page</h1>
    </Div>
  );
}

const Div = styled.div`
  background-color: #e1ffee;
  color: #83debb;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
