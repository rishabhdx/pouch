"use client";

import { useState } from "react";
import { ChevronDown, FolderOpen } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@pouch/ui/components/collapsible";
import { Checkbox } from "@pouch/ui/components/checkbox";
import { Label } from "@pouch/ui/components/label";
import { cn } from "@pouch/ui/lib/utils";
import { sidebarData } from "@/constants/sample-data";
import { Badge } from "@pouch/ui/components/badge";

interface CollectionsSheetFilterProps {
  value: string[];
  setValue: (v: string[]) => void;
  isCollectionsDisabled?: boolean;
}

export function CollectionsSheetFilter({
  value = [],
  setValue,
  isCollectionsDisabled = false
}: CollectionsSheetFilterProps) {
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
            <FolderOpen
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <h4 className="text-sm font-medium">Collections</h4>
          </div>
          {value.length > 0 && (
            <Badge
              variant="secondary"
              className="text-xs text-muted-foreground rounded-full"
            >
              {value.length} filters applied
            </Badge>
          )}
        </div>
        <span className="sr-only">Toggle</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2 pb-4">
        <div
          className={cn(
            "flex flex-col gap-2",
            isCollectionsDisabled && "bg-muted/50 p-2 rounded-md"
          )}
        >
          {isCollectionsDisabled && (
            <p className="text-sm text-center font-medium text-muted-foreground mb-2">
              Collection filters are currently disabled.
            </p>
          )}
          {sidebarData.collections.map(collection => (
            <div className="flex items-center gap-2" key={collection.slug}>
              <Checkbox
                id={collection.slug}
                checked={value.includes(collection.slug)}
                onCheckedChange={checked => {
                  if (checked) {
                    setValue([...value, collection.slug]);
                  } else {
                    setValue(value.filter(c => c !== collection.slug));
                  }
                }}
                disabled={isCollectionsDisabled}
              />
              <Label htmlFor={collection.slug}>{collection.name}</Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
