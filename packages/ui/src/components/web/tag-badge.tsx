import { memo, useMemo } from "react";

import { cn } from "@pouch/ui/lib/utils";

const colours = [
  "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-200",
  "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200",
  "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-200",
  "bg-yellow-100 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200",
  "bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-purple-200",
  "bg-pink-100 text-pink-900 dark:bg-pink-800 dark:text-pink-200",
  "bg-indigo-100 text-indigo-900 dark:bg-indigo-800 dark:text-indigo-200",
  "bg-teal-100 text-teal-900 dark:bg-teal-800 dark:text-teal-200"
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
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
        colourClass,
        className
      )}
    >
      {children}
    </span>
  );
});
