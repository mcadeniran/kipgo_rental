'use client';

import {Link, usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({
  href,
  children,
}: NavLinkProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "relative text-sm font-medium transition-colors duration-200 hover:text-k-primary",

        active
          ? "text-k-primary"
          : "text-muted-foreground"
      )}
    >
      {children}

      <span
        className={cn(

          "absolute left-0 -bottom-1 h-0.5 bg-k-primary transition-all duration-300",

          active

            ? "w-full"

            : "w-0 group-hover:w-full"

        )}
      />
    </Link>
  );
}