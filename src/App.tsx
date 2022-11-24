import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./assets/styles/global";
import { DefaultTheme } from "./assets/styles/themes/default";
import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
