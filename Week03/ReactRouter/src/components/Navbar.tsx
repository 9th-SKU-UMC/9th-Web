import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Div>
      <Nav>
        <Link to="/">Home Page</Link>
        <Link to="/2">Page2</Link>
      </Nav>
    </Div>
  );
};

export default Navbar;

const Div = styled.div`
  background-color: #ffe1f6;
  padding: 30px;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 100px;

  a {
    color: #ffa5e4;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
  }

  a:hover {
    color: #fd86c2;
  }

  a:active {
    color: deeppink;
    transform: scale(0.95);
  }
`;
