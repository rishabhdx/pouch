import { memo, useMemo } from "react";

import { cn } from "@pouch/ui/lib/utils";

const colours = [
  "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200",
  "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-200",
  "bg-yellow-100 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200",
  "bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-purple-200",
  "bg-pink-100 text-pink-900 dark:bg-pink-800 dark:text-pink-200",
  "bg-indigo-100 text-indigo-900 dark:bg-indigo-800 dark:text-indigo-200",
  "bg-teal-100 text-teal-900 dark:bg-teal-800 dark:text-teal-200",
  "bg-amber-100 text-amber-900 dark:bg-amber-800 dark:text-amber-200",
  "bg-lime-100 text-lime-900 dark:bg-lime-800 dark:text-lime-200",
  "bg-cyan-100 text-cyan-900 dark:bg-cyan-800 dark:text-cyan-200",
  "bg-sky-100 text-sky-900 dark:bg-sky-800 dark:text-sky-200",
  "bg-violet-100 text-violet-900 dark:bg-violet-800 dark:text-violet-200",
  "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-800 dark:text-fuchsia-200",
  "bg-rose-100 text-rose-900 dark:bg-rose-800 dark:text-rose-200"
];

const getColourClass = () => {
  return colours[Math.floor(Math.random() * colours.length)];
};

export const TagBadge = memo(function TagBadgeBase({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const colourClass = useMemo(() => getColourClass(), []);

  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border transition-[color,box-shadow] overflow-hidden",
        colourClass,
        className
      )}
    >
      {children}
    </span>
  );
});
