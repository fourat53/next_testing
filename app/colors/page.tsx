const colors = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const;

export default function ColorsPage() {
  return (
    <main className="mx-auto">
      <h1 className="text-2xl font-bold pb-3">Theme Color Palette</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {colors.map((color) => (
          <div
            key={color}
            className="flex flex-col gap-2 p-2 border rounded-lg bg-card shadow-sm"
          >
            <div
              className="w-full h-20 rounded-md border border-black/10 dark:border-white/10"
              style={{ backgroundColor: `var(--${color})` }}
            />

            <span className="text-xs text-center font-mono font-medium truncate text-card-foreground">
              {color}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
