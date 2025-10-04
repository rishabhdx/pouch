import { Archive, Cloud, Heart } from "lucide-react";

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
