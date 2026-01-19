import Link from "next/link";

import { Button } from "@pouch/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@pouch/ui/components/empty";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { ArrowUpRightIcon, FolderX } from "lucide-react";

const DEFAULT_VALUES = {
  title: "No bookmarks found",
  description:
    "You haven't added any bookmarks in this collection yet. Get started by adding one using our web extension.",
  ctaText: "Download extension",
  ctaLink: "#"
};

type BookmarksEmptyStateProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  icon?: IconSvgElement;
};

export function BookmarksEmptyState({
  title = DEFAULT_VALUES.title,
  description = DEFAULT_VALUES.description,
  ctaText = DEFAULT_VALUES.ctaText,
  ctaLink = DEFAULT_VALUES.ctaLink
}: BookmarksEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderX className="size-6" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="font-semibold">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={ctaLink}>
              {ctaText}
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          {/* <Button variant="outline">Import Bookmark</Button> */}
        </div>
      </EmptyContent>
    </Empty>
  );
}
