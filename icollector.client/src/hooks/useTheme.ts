import { useContext } from "react";
import { Themes } from "../@types/ThemeContextType";
import { ThemeContext } from "../providers/ThemeProvider";

const useTheme = (): [Themes, (theme: Themes) => void] => {
    const currentThemeContext = useContext(ThemeContext);

    if (currentThemeContext === null) {
        throw new Error("'useTheme' should be used within '<ThemeProvider>'.");
    }

    return [currentThemeContext.theme, currentThemeContext.setTheme];
}

export default useTheme;
