import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { ThemeType, type Theme } from "../schema";
import OutlineButton from "./OutlineButton";
import LightThemeIcon from "../assets/icons/LightThemeIcon";
import DarkThemeIcon from "../assets/icons/DarkThemeIcon";

const ThemeButton = () => {
  const { theme, themeController } = useContext<Theme>(ThemeContext);

  const setLightTheme = () => {
    themeController(ThemeType.light);
  };

  const setDarkTheme = () => {
    themeController(ThemeType.dark);
  };

  switch (theme) {
    case ThemeType.dark:
      return (
        <OutlineButton onClick={setLightTheme}>
          <LightThemeIcon />
        </OutlineButton>
      );

    case ThemeType.light:
      return (
        <OutlineButton onClick={setDarkTheme}>
          <DarkThemeIcon />
        </OutlineButton>
      );

    default:
      return (
        <OutlineButton onClick={setDarkTheme}>
          <DarkThemeIcon />
        </OutlineButton>
      );
  }
};

export default ThemeButton;
