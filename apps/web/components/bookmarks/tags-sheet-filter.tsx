"use client";

import { useId, useState } from "react";
import { ChevronDown, Hash } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@pouch/ui/components/collapsible";
import { Checkbox } from "@pouch/ui/components/checkbox";
import { Label } from "@pouch/ui/components/label";
import { cn } from "@pouch/ui/lib/utils";
import { Badge } from "@pouch/ui/components/badge";

interface TagsSheetFilterProps {
  value: string[];
  setValue: (v: string[]) => void;
}

export function TagsSheetFilter({
  value = [],
  setValue
}: TagsSheetFilterProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "flex w-[350px] flex-col gap-2 group/collapsible",
        "[&[data-state=closed]>div>button>svg]:rotate-0 [&[data-state=closed]>div>button>svg]:transition-transform",
        "[&[data-state=open]>div>button>svg]:rotate-180 [&[data-state=open]>div>button>svg]:transition-transform"
      )}
    >
      <CollapsibleTrigger className="w-full py-4 flex items-center justify-between text-muted-foreground hover:text-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-muted-foreground" aria-hidden="true" />
            <h4 className="text-sm font-medium">Tags</h4>
          </div>
          {value.length > 0 && (
            <Badge
              variant="secondary"
              className="text-xs text-muted-foreground rounded-full"
            >
              2 filters applied
            </Badge>
          )}
        </div>
        <span className="sr-only">Toggle</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-1`} />
            <Label htmlFor={`${id}-1`}>state</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-2`} />
            <Label htmlFor={`${id}-2`}>styling</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>next 15</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>tanstack router</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>turborepo</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>shadcn</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>ui</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>tanstack query</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-3`} />
            <Label htmlFor={`${id}-3`}>full stack</Label>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
