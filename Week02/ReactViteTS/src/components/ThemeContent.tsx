import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "flex flex-col items-center text-xl p-4 h-dvh w-full",
        isLightMode ? "bg-white text-black" : "bg-gray-800 text-white"
      )}
    >
      What mode is it now? <hr />
      (Light / Dark)
      <div
        className={clsx(
          "m-10",
          isLightMode ? "text-black font-extrabold text-3xl" : "text-gray-800"
        )}
      >
        This is Light Mode
      </div>
      <div
        className={clsx(
          "m-10",
          isLightMode ? "text-white" : "text-white font-extrabold text-3xl"
        )}
      >
        This is Dark Mode
      </div>
    </div>
  );
}
