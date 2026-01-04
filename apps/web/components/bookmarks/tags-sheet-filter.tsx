"use client";

import { useState } from "react";
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
  allTags: { id: string; name: string; slug: string }[];
}

export function TagsSheetFilter({
  value = [],
  setValue,
  allTags = []
}: TagsSheetFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  // console.log("TagsSheetFilter render:", { value, allTags });

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
      <CollapsibleTrigger className="w-full py-4 flex items-center justify-between">
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
              {value.length > 1
                ? `${value.length} tags selected`
                : "1 tag selected"}
            </Badge>
          )}
        </div>
        <span className="sr-only">Toggle</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="grid gap-3">
          {allTags.map(tag => (
            <div key={tag.id} className="flex items-center gap-2">
              <Checkbox
                id={`${tag.id}-${tag.slug}`}
                checked={value.includes(tag.slug)}
                onCheckedChange={checked => {
                  if (checked) {
                    setValue([...value, tag.slug]);
                  } else {
                    setValue(value.filter(c => c !== tag.slug));
                  }
                }}
              />
              <Label htmlFor={`${tag.id}-${tag.slug}`}>{tag.name}</Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
