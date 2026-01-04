import { Label } from "@pouch/ui/components/label";
import { Switch } from "@pouch/ui/components/switch";
import { Archive } from "lucide-react";

interface ArchivedSheetFilterProps {
  value: boolean | null;
  setValue: (value: boolean | null) => void;
}

export function ArchivedSheetFilter({
  value,
  setValue
}: ArchivedSheetFilterProps) {
  return (
    <div className="w-full py-4 flex items-center justify-between space-x-2">
      <div className="flex items-center gap-2">
        <Archive className="size-4 text-muted-foreground" aria-hidden="true" />
        <Label htmlFor="archived">Archived</Label>
      </div>
      <Switch
        id="archived"
        checked={value ?? false}
        onCheckedChange={setValue}
      />
    </div>
  );
}
