import { Badge } from "@pouch/ui/components/badge";
import { Button } from "@pouch/ui/components/button";
import { Card } from "@pouch/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import {
  Archive,
  Clock,
  ExternalLink,
  MoreVertical,
  Star,
  Trash2
} from "lucide-react";

// Sample bookmark data
const recentBookmarks = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js",
    url: "https://example.com/nextjs-guide",
    image: "/modern-web-development.png",
    tags: ["Development", "React"],
    savedDate: "2 days ago",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "The Complete Guide to TypeScript",
    url: "https://example.com/typescript-guide",
    image: "/typescript-code.png",
    tags: ["TypeScript", "Programming"],
    savedDate: "3 days ago",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Understanding Design Systems",
    url: "https://example.com/design-systems",
    image: "/design-system-interface.jpg",
    tags: ["Design", "UI/UX"],
    savedDate: "5 days ago",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Advanced React Patterns",
    url: "https://example.com/react-patterns",
    image: "/react-components.png",
    tags: ["React", "Development"],
    savedDate: "1 week ago",
    readTime: "10 min read"
  }
];

export function RecentSaves() {
  return (
    <div className="lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recent Saves</h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {recentBookmarks.map(bookmark => (
          <Card
            key={bookmark.id}
            className="group p-4 hover:shadow-md transition-all"
          >
            <div className="flex gap-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                <img
                  src={bookmark.image || "/placeholder.svg"}
                  alt={bookmark.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {bookmark.title}
                  </h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Open Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Star className="h-4 w-4" />
                        Add to Favorites
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {bookmark.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {bookmark.savedDate}
                  </span>
                  <span>{bookmark.readTime}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
