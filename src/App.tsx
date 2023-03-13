import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import reset from "react-style-reset/string";
import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;800&family=Nunito:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&family=Source+Sans+Pro:wght@300;400;600;900&display=swap');

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  input:focus {
    outline: none;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
