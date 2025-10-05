import { ArrowUpRightIcon, FolderX } from "lucide-react";

import { Button } from "@pouch/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@pouch/ui/components/empty";
import Link from "next/link";

export function BookmarksEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderX className="size-6" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="font-semibold">No bookmarks found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any bookmarks in this collection yet. Get
          started by adding one using our web extension.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="#">
              Download extension
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          {/* <Button variant="outline">Import Bookmark</Button> */}
        </div>
      </EmptyContent>
    </Empty>
  );
}
