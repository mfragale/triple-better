"use client";

import * as React from "react";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setTheme]);

  return (
    <Button
      variant="outline"
      className="rounded-full"
      size="icon"
      onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? (
        <MoonIcon className="w-2 h-2" />
      ) : (
        <SunMediumIcon className="w-2 h-2" />
      )}
    </Button>
  );
};

export default ThemeToggle;
