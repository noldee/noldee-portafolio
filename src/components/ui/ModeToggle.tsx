import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Añadimos clases para forzar el color negro y quitar el tono marrón */}
        <Button
          variant="outline"
          size="icon"
          className="bg-white dark:bg-black border-gray-200 dark:border-white/20 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-black dark:border-white/10"
      >
        <DropdownMenuItem
          className="dark:focus:bg-neutral-900"
          onClick={() => setThemeState("theme-light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:focus:bg-neutral-900"
          onClick={() => setThemeState("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:focus:bg-neutral-900"
          onClick={() => setThemeState("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
