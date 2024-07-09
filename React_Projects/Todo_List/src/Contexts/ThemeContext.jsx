import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    theme: "light"
});

export function useTheme(){
    return useContext(ThemeContext);
}

export const themeProvider = ThemeContext.Provider;

