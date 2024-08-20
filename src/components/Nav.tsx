import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 2px solid ${(props) => props.theme.textColor};
  margin-right: 20px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 5px 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
  }
`;

function Nav() {
  const isDark = useRecoilValue(isDarkAtom);
  const setTheme = useSetRecoilState(isDarkAtom);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <Container>
      <Button onClick={toggleTheme}>
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </Button>
    </Container>
  );
}

export default Nav;
