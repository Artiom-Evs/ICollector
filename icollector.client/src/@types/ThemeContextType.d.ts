
export const supportedThemes = [
    "light",
    "dark"
] as const;

export type Themes = typeof supportedThemes[number];

export interface ThemeContextType {
    theme: Themes,
    setTheme: (theme: Themes) => void
}
