import { createContext } from "react";
import { ThemeType, type Theme } from "../schema";

const initialTheme: Theme = {
  theme: ThemeType.light,
  themeController: () => false,
};

const ThemeContext = createContext<Theme>(initialTheme);

export default ThemeContext;
