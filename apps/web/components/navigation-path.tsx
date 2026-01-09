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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { PATHS } from "@/constants";
import { HugeiconsIcon } from "@hugeicons/react";

const parsePathname = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments;
};

export function NavigationPath() {
  const pathname = usePathname();
  const segments = parsePathname(pathname || "/");

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const item = PATHS.find(path => path.href === segment);

    return {
      label: item?.name || segment,
      icon: item?.icon,
      href
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          if (breadcrumb.href === pathname) {
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbPage className="inline-flex items-center gap-2">
                    {breadcrumb.icon && (
                      <HugeiconsIcon
                        icon={breadcrumb.icon}
                        color="currentColor"
                        className="size-4 inline-block"
                        aria-hidden="true"
                      />
                    )}
                    {breadcrumb.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            );
          }

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={breadcrumb.href}
                    className="flex items-center gap-2"
                  >
                    {breadcrumb.icon && (
                      <HugeiconsIcon
                        icon={breadcrumb.icon}
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
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
