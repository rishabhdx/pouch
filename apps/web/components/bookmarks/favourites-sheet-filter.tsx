import { Label } from "@pouch/ui/components/label";
import { Switch } from "@pouch/ui/components/switch";
import { Heart } from "lucide-react";

interface FavouritesSheetFilterProps {
  value: boolean | null;
  setValue: (value: boolean | null) => void;
}

export function FavouritesSheetFilter({
  value,
  setValue
}: FavouritesSheetFilterProps) {
  return (
    <div className="w-full flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center gap-2">
        <Heart className="size-4 text-muted-foreground" aria-hidden="true" />
        <Label htmlFor="favourites" className="text-muted-foreground">
          Favourites
        </Label>
      </div>
      <Switch
        id="favourites"
        checked={value ?? false}
        onCheckedChange={setValue}
      />
    </div>
  );
}
