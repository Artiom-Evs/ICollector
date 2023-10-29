import { FunctionComponent, PropsWithChildren, createContext, useMemo, useState } from "react"
import { ThemeContextType, Themes } from "../@types/ThemeContextType";

function getStoredTheme(): Themes | null {
    const savedTheme: string | null = localStorage.getItem("app-theme");
    return savedTheme as Themes | null;
}

function setStoredTheme(theme: Themes) {
    localStorage.setItem("app-theme", theme);
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const defaultTheme: Themes = "light";

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<Themes>(getStoredTheme() ?? defaultTheme);
    const contextValue = useMemo(() => ({ theme, setTheme } as ThemeContextType), [theme]);

    if (theme !== getStoredTheme()) {
        setStoredTheme(theme);
    }

    // themes system is supported in bootstrap since version 5.3
    document.documentElement.setAttribute("data-bs-theme", theme);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
