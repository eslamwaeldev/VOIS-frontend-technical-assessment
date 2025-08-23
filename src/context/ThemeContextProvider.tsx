import { useEffect, useState, type PropsWithChildren } from "react";
import { ThemeType, type Theme } from "../schema";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const localStorageTheme = localStorage.getItem("theme");
  const isSavedThemeCorrect = Object.values(ThemeType).includes(localStorageTheme as ThemeType);
  const initialTheme = isSavedThemeCorrect ? localStorageTheme : ThemeType.light;

  const [theme, setTheme] = useState<ThemeType>((initialTheme as ThemeType) ?? ThemeType.light);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    switch (theme) {
      case ThemeType.dark:
        document.documentElement.classList.add("dark");
        break;

      default:
        document.documentElement.classList.remove("dark");
        break;
    }
  }, [theme]);

  const themeController = (theme: ThemeType) => {
    setTheme(theme);
  };

  const value: Theme = {
    theme,
    themeController,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
