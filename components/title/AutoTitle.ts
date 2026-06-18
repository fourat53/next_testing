"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AutoTitle() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    if (pathname === "/") {
      document.title = "Shopofort - Home";
      return;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0) {
      const mainRoute = segments[0];

      const formattedRoute = mainRoute
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      document.title = `Shopofort - ${formattedRoute}`;
    }
  }, [pathname]);

  return null;
}
