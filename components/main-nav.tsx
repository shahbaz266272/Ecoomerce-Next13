"use client";
import React from "react";

import { cn } from "@/lib/utils";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const MainNavigation = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathnames = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathnames === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathnames === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathnames === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathnames === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}>
      {routes?.map((route) => (
        <Link
          key={route?.href}
          href={route?.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route?.active
              ? "text-black dark:text-white "
              : "text-muted-foreground"
          )}
        >
          {route?.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavigation;
