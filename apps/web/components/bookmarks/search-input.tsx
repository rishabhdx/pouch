"use client";

import { Filter } from "lucide-react";
import { Input } from "@pouch/ui/components/input";

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
}

export function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <div className="shrink-0 relative max-w-[15rem] w-full">
      <Input
        placeholder="Search by title"
        value={value ?? ""}
        onChange={e => setValue(e.target.value)}
        className="w-full pl-8 placeholder:text-foreground"
      />

      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-foreground peer-disabled:opacity-50">
        <Filter className="size-4" aria-hidden="true" />
      </div>
    </div>
  );
}
