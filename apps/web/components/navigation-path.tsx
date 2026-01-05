"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage, //! TODO: add current path highlight and functionality
  BreadcrumbSeparator
} from "@pouch/ui/components/breadcrumb";
import { PATHS } from "@/constants";
import { HugeiconsIcon } from "@hugeicons/react";

const parsePathname = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments;
};

export function NavigationPath() {
  const pathname = usePathname();
  console.log("pathname", pathname);
  const segments = parsePathname(pathname || "/");
  console.log("segments", segments);
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const item = PATHS.find(path => path.href === segment);

    return { label: item?.name || segment, icon: item?.icon, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={breadcrumb.href}
                  className="flex items-center gap-2 text-foreground hover:underline"
                >
                  {breadcrumb.icon && (
                    <HugeiconsIcon
                      icon={breadcrumb.icon}
                      // size={24}
                      color="currentColor"
                      className="size-4 inline-block"
                      aria-hidden="true"
                    />
                  )}
                  {breadcrumb.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
