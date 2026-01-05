import { Archive, Cloud, Heart } from "lucide-react";
import {
  Archive03Icon,
  FavouriteIcon,
  AllBookmarkIcon,
  Folder01Icon,
  Home01Icon,
  Tag01Icon
} from "@hugeicons/core-free-icons";

export const SIDEBAR_STATIC_GROUPS = [
  {
    name: "All",
    icon: Cloud,
    slug: "all"
  },
  {
    name: "Favorites",
    icon: Heart,
    slug: "all?favorite=true"
  },
  {
    name: "Archived",
    icon: Archive,
    slug: "all?archived=true"
  }
];

export const PATHS = [
  { name: "Dashboard", href: "dashboard", icon: Home01Icon },
  { name: "All bookmarks", href: "all", icon: AllBookmarkIcon },
  { name: "Favorite", href: "favorite", icon: FavouriteIcon },
  { name: "Archived", href: "archived", icon: Archive03Icon },
  { name: "Collections", href: "collections", icon: Folder01Icon },
  { name: "Tags", href: "tags", icon: Tag01Icon }
];
