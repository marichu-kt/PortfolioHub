import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4 py-2 rounded-md border
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition
      "
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}
