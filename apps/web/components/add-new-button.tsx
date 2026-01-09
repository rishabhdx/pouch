import { Button } from "@pouch/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload03Icon, BookmarkAdd02Icon } from "@hugeicons/core-free-icons";

export function AddNewButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <HugeiconsIcon
            icon={BookmarkAdd02Icon}
            color="currentColor"
            strokeWidth={2}
            className="size-4"
            aria-hidden="true"
          />
          Import
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon
              icon={Upload03Icon}
              color="currentColor"
              strokeWidth={1.5}
              className="size-4"
              aria-hidden="true"
            />
            Import from a browser
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
