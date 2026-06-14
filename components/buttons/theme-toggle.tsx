"use client";

import { IconMoon, IconSun, IconSunMoon, type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@wrksz/themes/client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoaderSmall from "../loaders/loader-small";

type ThemeType = {
  icon: Icon;
  value: "light" | "dark" | "system";
};

const themes: ThemeType[] = [
  { icon: IconSun, value: "light" },
  { icon: IconMoon, value: "dark" },
  { icon: IconSunMoon, value: "system" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="icon" className="rounded-full">
        <LoaderSmall />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-mist-400 shadow-sm"
        >
          {theme === "light" ? (
            <IconSun className="size-4" />
          ) : theme === "dark" ? (
            <IconMoon className="size-4" />
          ) : (
            <IconSunMoon className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col gap-0.75">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              t.value === theme && "bg-primary text-white",
              "cursor-pointer hover:bg-accent",
            )}
          >
            <t.icon className="size-4" />
            {t.value.charAt(0).toUpperCase() + t.value.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
