import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "react-style-reset/string";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import Nav from "./components/Nav";

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
  input:focus,
  select:focus {
    outline: none;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Nav />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
