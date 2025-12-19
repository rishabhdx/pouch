import { createFileRoute, Link } from "@tanstack/react-router";

import { cn } from "@pouch/ui/lib/utils";
import { Button, buttonVariants } from "@pouch/ui/components/button";

import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/new-tag")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="w-sm h-96 overflow-y-auto bg-background text-foreground border border-border rounded-md p-4 flex flex-col space-y-4">
      <div className="w-full">
        <Link
          to="/tags"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
      </div>
      ADD NEW TAG FORM HERE
    </div>
  );
}
