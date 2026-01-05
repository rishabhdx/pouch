import { ArrowUpDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@pouch/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import {
  ArrowUp01,
  ArrowUp10,
  ArrowUpAZ,
  ArrowUpDown,
  ArrowUpZA
} from "lucide-react";
import { memo } from "react";

type SortByProps = {
  value: { id: string; desc: boolean }[];
  setValue: (value: { id: string; desc: boolean }[]) => void;
};

export const SortBy = memo(function SortByBase({
  value,
  setValue
}: SortByProps) {
  const transformedValues = value.map(v => `${v.id}-${v.desc}`);

  const handleChange = (newValue: string) => {
    const [id, desc] = newValue.split("-");

    if (!id || !desc) return;

    if (desc === "none") {
      const updatedValues = value.filter(v => v.id !== id);
      setValue(updatedValues);
      return;
    }

    if (value.find(v => v.id === id)) {
      const updatedValues = value.filter(v => v.id !== id);
      setValue([...updatedValues, { id, desc: desc === "true" }]);
      return;
    }

    setValue([...value, { id, desc: desc === "true" }]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {/* <ArrowUpDown className="size-4" aria-hidden="true" /> */}
          <HugeiconsIcon
            icon={ArrowUpDownIcon}
            color="currentColor"
            strokeWidth={1.5}
          />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Title
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={transformedValues.find(v => v.startsWith("title"))}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem value="title-none">None</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="title-false">
            Ascending
            <ArrowUpAZ className="size-4 ml-auto" aria-hidden="true" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="title-true">
            Descending
            <ArrowUpZA className="size-4 ml-auto" aria-hidden="true" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Date added
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={transformedValues.find(v => v.startsWith("createdAt"))}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem value="createdAt-none">
            None
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt-false">
            Ascending
            <ArrowUp01 className="size-4 ml-auto" aria-hidden="true" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt-true">
            Descending
            <ArrowUp10 className="size-4 ml-auto" aria-hidden="true" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
