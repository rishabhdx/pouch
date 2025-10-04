import { Skeleton } from "@pouch/ui/components/skeleton";

export function SidebarGroupsLoadingState() {
  return (
    <div className="w-full space-y-4 mt-2 px-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}
