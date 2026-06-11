"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export default function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="rounded-full p-1 size-8 bg-primary text-white hover:bg-primary hover:text-white"
      />
    );
  }

  const isLight = resolvedTheme === "light";

  return (
    <Button
      variant="outline"
      icon={isLight ? <IconMoon /> : <IconSun />}
      className="rounded-full p-1 size-8 bg-primary dark:bg-primary text-white hover:bg-primary hover:text-white"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    />
  );
}
