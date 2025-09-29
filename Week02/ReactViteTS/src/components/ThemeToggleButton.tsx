import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 y-2 mt-4 p-2 rounded-md transition-all", {
        "bg-gray-800 font-semibold text-white": isLightMode,
        "bg-white font-semibold text-black": !isLightMode,
      })}
    >
      {isLightMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
