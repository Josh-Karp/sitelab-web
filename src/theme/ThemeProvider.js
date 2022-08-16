import { useState, createContext, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StyledEngineProvider } from "@mui/material/styles";

export const ThemeContext = createContext((_themeName) => {});

const ThemeProviderWrapper = (props) => {
  const [themeName, _setThemeName] = useState("LightTheme");

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem("appTheme") || "LightTheme";
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    window.localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
